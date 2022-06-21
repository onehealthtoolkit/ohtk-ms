import React from "react";
import tw from "tailwind-styled-components";
import { PencilAltIcon, TrashIcon, EyeIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react";

export const TableHeader = tw.th`
  px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50
`;

export const TableCell = tw.td`
  px-6 py-4 whitespace-no-wrap border-b border-gray-200
`;

interface ActionHandlerProps {
  onClick: () => void;
}

const EditAction = (props: ActionHandlerProps) => (
  <PencilAltIcon
    className="mx-1 w-5 h-5 text-indigo-600 hover:text-indigo-900 cursor-pointer"
    {...props}
  />
);

const ClickAction = () => (
  <EyeIcon className="mx-1 w-5 h-5 text-gray-600 hover:text-gray-900" />
);

const DeleteAction = (props: ActionHandlerProps) => (
  <TrashIcon
    className="mx-1 w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
    {...props}
  />
);

type ItemWithId = {
  id: string;
};

interface TableProps<T> {
  columns: {
    label: string;
    get: (record: T) => string | JSX.Element | undefined;
  }[];
  data: T[];
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
}

const Table = <T extends ItemWithId | null>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  return (
    <div className="mb-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map(column => (
                <TableHeader key={column.label}>{column.label}</TableHeader>
              ))}
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map(record => (
              <tr key={record?.id}>
                {columns.map(column => (
                  <TableCell key={column.label}>{column.get(record)}</TableCell>
                ))}
                <TableCell>
                  <div className="flex">
                    <EditAction
                      onClick={() => {
                        onEdit && onEdit(record);
                      }}
                    />
                    <ClickAction />
                    <DeleteAction
                      onClick={() => {
                        onDelete && onDelete(record);
                      }}
                    />
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(Table);
