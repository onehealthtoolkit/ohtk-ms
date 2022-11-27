import { useEffect, useState } from "react";
import Select from "react-select";
import useServices from "lib/services/provider";
import { styledReactSelect } from "./styledReactSelect";
import useStore from "lib/store";
import { Authority } from "lib/services/authority";

type AuthorityFilterProps = {
  onChange: (value: AuthorityOption) => void;
  value?: number;
  roleRequired?: boolean;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroitySelect: React.FC<AuthorityFilterProps> = ({
  value,
  onChange,
  roleRequired,
}) => {
  const store = useStore();
  const { authorityService } = useServices();
  const [authorities, setAuthorities] = useState<AuthorityOption[]>();

  useEffect(() => {
    async function loadOptions() {
      let authorities: Authority[] = [];
      if (roleRequired) {
        if (store.isSuperUser)
          authorities = await (
            await authorityService.lookupAuthorities(100, 0, "")
          ).items!;
        else if (store.isRoleAdmin)
          authorities =
            await await authorityService.lookupAuthorityInheritsDown(
              store.authorityId!.toString()
            );
      } else {
        authorities = await (
          await authorityService.lookupAuthorities(100, 0, "")
        ).items!;
      }
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
  }, [authorityService, roleRequired, store]);

  return (
    <Select<AuthorityOption>
      value={authorities?.find(item => item.id == String(value))}
      isMulti={false}
      options={authorities}
      getOptionValue={item => item.id}
      getOptionLabel={item => item.name}
      styles={styledReactSelect}
      onChange={value => {
        if (value) {
          onChange(value);
        }
      }}
    />
  );
};

export default AuthroitySelect;
