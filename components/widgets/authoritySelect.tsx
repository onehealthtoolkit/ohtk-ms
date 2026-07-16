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
  /** When true, user can clear the selection (e.g. optional filters). */
  isClearable?: boolean;
  onClear?: () => void;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroitySelect: React.FC<AuthorityFilterProps> = ({
  value,
  onChange,
  roleRequired,
  isClearable,
  onClear,
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
        else if (
          (store.isRoleAdmin || store.isRoleOfficer) &&
          store.authorityId
        )
          // Staff may only pick authorities inside their inherits-down tree.
          authorities =
            await await authorityService.lookupAuthorityInheritsDown(
              store.authorityId.toString()
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
      value={authorities?.find(item => item.id == String(value)) || null}
      isMulti={false}
      isClearable={Boolean(isClearable)}
      options={authorities}
      getOptionValue={(item: AuthorityOption) => item.id}
      getOptionLabel={(item: AuthorityOption) => item.name}
      styles={styledReactSelect}
      onChange={(selected: AuthorityOption | null) => {
        if (selected) {
          onChange(selected);
        } else if (onClear) {
          onClear();
        }
      }}
    />
  );
};

export default AuthroitySelect;
