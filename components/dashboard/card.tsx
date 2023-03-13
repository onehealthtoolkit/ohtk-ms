import React, { ReactElement } from "react";

type DashboardCardProp = {
  title: string;
  titleClass?: string;
  action?: ReactElement;
  children: ReactElement;
};
const DashboardCard: React.FC<DashboardCardProp> = ({
  title,
  titleClass,
  children,
  action,
}) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-lg  ">
      <div className={`rounded-t-lg mb-0 px-4 py-2 h-[45px] ${titleClass}`}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <span className="font-['Kanit'] font-semibold text-white">
              {title}
            </span>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            {action}
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto p-2">{children}</div>
    </div>
  );
};

export default DashboardCard;
