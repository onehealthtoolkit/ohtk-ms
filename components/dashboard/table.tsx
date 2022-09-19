import React from "react";

const styles = {
  row: "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
};

type ItemWithId = {
  id: string;
};

interface DashboardTableProp<T> {
  columns: {
    label: string;
    get: (record: T) => string | JSX.Element | undefined;
  }[];
  data: T[];
  onRowClick?: (record: T) => void;
}

const DashboardTable = <T extends ItemWithId | null>({
  columns,
  data,
  onRowClick,
}: DashboardTableProp<T>) => {
  return (
    <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-[#E0E5EB] dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map(column => (
            <th
              key={column.label}
              scope="col"
              className="py-3 px-6 whitespace-nowrap"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm font-normal font-['Bai_Jamjuree']">
        {data.map(record => (
          <tr
            key={record?.id}
            className={styles.row}
            onClick={evt => {
              if ((evt.target as HTMLElement).nodeName == "TD")
                onRowClick && onRowClick(record);
            }}
          >
            {columns.map(column => (
              <td key={column.label} className="px-6 py-4">
                {column.get(record)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
