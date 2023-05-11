import { useEffect, useState } from "react";
import Select from "react-select";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { styledReactSelect } from "components/widgets/styledReactSelect";

type AuthorityFilterProps = {
  value: AuthorityOption;
  onChange: (value: AuthorityOption) => void;
  name?: string;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({
  value,
  name,
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
      name={name}
      defaultValue={value}
      isMulti={false}
      options={authorities}
      getOptionValue={item => item.id}
      getOptionLabel={item => item.name}
      styles={{
        ...styledReactSelect,
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
