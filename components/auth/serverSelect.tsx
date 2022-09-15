import { ServerIcon } from "@heroicons/react/outline";
import { ServerOption } from "./signin/viewModel";

type AuthorityFilterProps = {
  onChange: (value: string) => void;
  serverOptions: ServerOption[];
};

const ServerSelect: React.FC<AuthorityFilterProps> = ({
  serverOptions,
  onChange,
}) => {
  return (
    <div className="flex">
      <label
        className="inline-flex items-center  text-grey-darker text-sm font-bold"
        htmlFor="server"
      >
        <ServerIcon className="h-5 w-5 text-gray-500" />
      </label>
      <select
        id="server"
        onChange={e => {
          onChange(e.target.value);
        }}
      >
        <option value="">---</option>
        {serverOptions.map(option => (
          <option key={option.domain} value={option.domain}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServerSelect;
