import { ReactElement } from "react";

export type TabBarProps = {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
};

export const TabBar: React.FC<TabBarProps> = ({ children }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
      {children}
    </ul>
  );
};

export type TabItemProps = {
  id: string;
  active: boolean;
  children: (props: {
    active: boolean;
    activeCss: string;
  }) => ReactElement | ReactElement[];
  onTab?: (id: string) => void;
};

export const TabItem: React.FC<TabItemProps> = ({
  id,
  active,
  children,
  onTab,
}) => {
  const activeCss = active
    ? "text-blue-600 border-blue-600 active"
    : "border-transparent hover:text-gray-600 hover:border-gray-300  ";

  const childActiveCss = active
    ? "text-blue-600"
    : "text-gray-400 group-hover:text-gray-500";

  return (
    <li className="mr-2">
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          onTab && onTab(id);
        }}
        className={`inline-flex p-4 rounded-t-lg border-b-2 group ${activeCss}`}
        aria-current="page"
      >
        {children({ active, activeCss: childActiveCss })}
      </a>
    </li>
  );
};
