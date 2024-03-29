import React from "react";
import tw from "tailwind-styled-components";
import { PencilAltIcon, TrashIcon, EyeIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react";
import { Trans } from "react-i18next";
import Spinner from "../spinner";
import Tooltip from "../tooltip";
import i18next from "i18next";
const t = i18next.getFixedT(null, null);

export const TableHeader = tw.th`
  px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-[#E0E5EB]
`;

export const TableCell = tw.td`
  px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm
`;

interface ActionHandlerProps {
  onClick: () => void;
}

export const EditAction = (props: ActionHandlerProps) => (
  <Tooltip text={`${t("form.button.edit", "Edit.")}`}>
    <PencilAltIcon
      type="edit"
      className="w-5 h-5 text-[#ADC7FF] hover:text-indigo-900 cursor-pointer"
      {...props}
    />
  </Tooltip>
);

const ClickAction = (props: ActionHandlerProps) => (
  <Tooltip text={`${t("form.button.view", "View.")}`}>
    <EyeIcon
      className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer"
      {...props}
    />
  </Tooltip>
);

const DeleteAction = (props: ActionHandlerProps) => (
  <Tooltip text={`${t("form.button.delete", "Delete.")}`}>
    <TrashIcon
      className="w-5 h-5 text-[#DA3535] hover:text-red-800 cursor-pointer"
      {...props}
    />
  </Tooltip>
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
  onView?: (record: T) => void;
  viewOnRowClick?: boolean;
  actions?: (record: T) => string | JSX.Element;
  onLoading?: boolean;
}

const Table = <T extends ItemWithId | null>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  viewOnRowClick = true,
  onLoading,
  actions,
}: TableProps<T>) => {
  const actionVisible =
    onEdit || (onView && !viewOnRowClick) || onDelete || actions;

  const rows = data.map(record => (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-[#F6F7F9]"
      key={record?.id}
      onClick={evt => {
        if ((evt.target as HTMLElement).nodeName == "TD")
          viewOnRowClick && onView && onView(record);
      }}
    >
      {columns.map(column => (
        <TableCell key={column.label}>{column.get(record)}</TableCell>
      ))}
      {actionVisible && (
        <TableCell>
          <div className="flex gap-2 justify-center">
            {onEdit && (
              <EditAction
                onClick={() => {
                  onEdit && onEdit(record);
                }}
              />
            )}
            {actions && actions(record)}
            {!viewOnRowClick && (
              <ClickAction
                onClick={() => {
                  onView && onView(record);
                }}
              />
            )}
            {onDelete && (
              <DeleteAction
                onClick={() => {
                  onDelete && onDelete(record);
                }}
              />
            )}
          </div>
        </TableCell>
      )}
    </tr>
  ));
  return (
    <div className="mb-4 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map(column => (
                <TableHeader key={column.label}>{column.label}</TableHeader>
              ))}
              {actionVisible && <TableHeader>Action</TableHeader>}
            </tr>
          </thead>
          <tbody className="bg-white">{!onLoading && rows}</tbody>
        </table>
        {onLoading && (
          <div className="flex justify-center min-h-24 h-24">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
        {!onLoading && !data.length && (
          <div className="text-center py-6">
            <Trans i18nKey="table.notFound">
              <span className="text-sm ">Not found</span>
            </Trans>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Table);
