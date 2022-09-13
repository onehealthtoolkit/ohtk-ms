import { useEffect, useState } from "react";
import Select from "react-select";
import useServices from "lib/services/provider";

type AuthorityFilterProps = {
  onChange: (value: AuthorityOption) => void;
  value?: number;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroitySelect: React.FC<AuthorityFilterProps> = ({
  value,
  onChange,
}) => {
  const { authorityService } = useServices();
  const [authorities, setAuthorities] = useState<AuthorityOption[]>();

  useEffect(() => {
    async function loadOptions() {
      const authorities = await (
        await authorityService.lookupAuthorities(100, 0, "")
      ).items;

      setAuthorities(
        authorities?.map(item => {
          return {
            id: item.id,
            name: item.name,
          };
        })
      );
    }
    loadOptions();
  }, [authorityService]);

  return (
    <Select<AuthorityOption>
      value={authorities?.find(item => item.id == String(value))}
      isMulti={false}
      options={authorities}
      getOptionValue={item => item.id}
      getOptionLabel={item => item.name}
      styles={{
        indicatorSeparator: () => ({}),
        control: base => ({
          ...base,
          boxShadow: "none",
        }),
      }}
      onChange={value => {
        if (value) {
          onChange(value);
        }
      }}
    />
  );
};

export default AuthroitySelect;
