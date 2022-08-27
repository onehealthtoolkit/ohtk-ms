import { useEffect, useState } from "react";
import DashboardViewModel from "./dashboardViewModel";
import Select from "react-select";
import useServices from "lib/services/provider";
import useStore from "lib/store";

type AuthorityFilterProps = {
  viewModel: DashboardViewModel;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({ viewModel }) => {
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
      value={{
        id: viewModel.authorityId.toString(),
        name: viewModel.authorityName,
      }}
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
          viewModel.authorityId = parseInt(value.id);
          viewModel.authorityName = value.name;
        }
      }}
    />
  );
};

export default AuthroityFilter;
