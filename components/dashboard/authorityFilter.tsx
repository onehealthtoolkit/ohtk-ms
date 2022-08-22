import { ChevronDownIcon } from "@heroicons/react/solid";
import DashboardViewModel from "./dashboardViewModel";

type AuthorityFilterProps = {
  viewModel: DashboardViewModel;
};

const AuthroityFilter: React.FC<AuthorityFilterProps> = ({ viewModel }) => {
  return (
    <>
      <p className="text-md dark:text-gray-400">
        <button
          className={`inline-flex bg-white justify-center  rounded-2xl border-gray-200  border-2 px-4 py-2 text-xl font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          {viewModel.authorityName}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 mt-1 text-[#292D32]"
            aria-hidden="true"
          />
        </button>
      </p>
    </>
  );
};

export default AuthroityFilter;
