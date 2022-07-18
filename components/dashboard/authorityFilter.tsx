import DashboardViewModel from "./dashboardViewModel";

type AuthorityFilterProps = {
  viewModel: DashboardViewModel;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({ viewModel }) => {
  return <div>authority {viewModel.authorityName}</div>;
};

export default AuthroityFilter;
