import { useEffect, useState } from "react";
import Select from "react-select";
import useServices from "lib/services/provider";
import useStore from "lib/store";

type AuthorityFilterProps = {
  value: AuthorityOption;
  onChange: (value: AuthorityOption) => void;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({
  value,
  onChange,
}) => {
  const services = useServices();
  const store = useStore();
  const [authorities, setAuthorities] = useState<AuthorityOption[]>();

  useEffect(() => {
    async function loadOptions() {
      const authorities =
        await await services.authorityService.lookupAuthorityInheritsDown(
          store.me!.authorityId.toString()
        );

      setAuthorities(
        authorities?.map(item => {
          return {
            id: item.id,
            name: item.name,
          };
        })
      );
    }
    if (store.me) loadOptions();
  }, [store.me, services.authorityService]);

  return (
    <Select<AuthorityOption>
      defaultValue={value}
      isMulti={false}
      options={authorities}
      getOptionValue={item => item.id}
      getOptionLabel={item => item.name}
      styles={{
        indicatorSeparator: () => ({}),
        control: base => ({
          ...base,
          borderWidth: "2px",
          borderColor: "#BCC8D3",
          borderRadius: "1rem",
          boxShadow: "none",
          fontSize: "1.25rem",
          fontWeight: 500,
        }),
        menu: provided => ({ ...provided, zIndex: 9999 }),
      }}
      onChange={value => {
        if (value) {
          onChange(value);
        }
      }}
    />
  );
};

export default AuthroityFilter;
