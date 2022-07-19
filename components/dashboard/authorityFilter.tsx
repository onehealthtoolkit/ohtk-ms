import { SearchIcon } from "@heroicons/react/solid";
import DashboardViewModel from "./dashboardViewModel";

type AuthorityFilterProps = {
  viewModel: DashboardViewModel;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({ viewModel }) => {
  return (
    <>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-300" />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="authority"
        />
      </div>
      <p className="text-md dark:text-gray-400">
        Authority: {viewModel.authorityName}
      </p>
    </>
  );
};

export default AuthroityFilter;
