import { XCircleIcon } from "@heroicons/react/solid";
import { authorities } from "components/admin/authority/authorityViewModel";
import { TextInput } from "components/widgets/forms";
import { useCombobox } from "downshift";
import { Authority } from "lib/services/authority";
import { observer } from "mobx-react";
import { FC, useState } from "react";

type Props = {
  values: Authority[];
  onAdd: (authorityId: string) => void;
  onDelete: (authorityId: string) => void;
};

function getAuthoritiesFilter(inputValue: string | undefined) {
  return function authoritysFilter(authority: Authority) {
    return (
      !inputValue ||
      authority.code.toLowerCase().includes(inputValue) ||
      authority.name.toLowerCase().includes(inputValue)
    );
  };
}

const AuthorityInherits: FC<Props> = ({ values = [], onAdd, onDelete }) => {
  const [items, setItems] = useState(authorities);
  const [selectedItem, setSelectedItem] = useState<Authority | null>();
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(authorities.filter(getAuthoritiesFilter(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      setSelectedItem(newSelectedItem);
    },
  });

  const onAddAuthority = () => {
    selectedItem && onAdd(selectedItem.id);
    setSelectedItem(null);
  };

  return (
    <>
      <div
        className={`text-gray-900 bg-white ${
          values.length > 0 && "border"
        } px-2 border-gray-200 rounded-md`}
      >
        {values.map(authority => {
          return (
            <button
              key={authority.id}
              type="button"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b last:border-0 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            >
              <span className="flex-grow text-left">{authority.name}</span>
              <XCircleIcon
                className="mx-1 w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => onDelete(authority.id)}
              />
            </button>
          );
        })}
      </div>
      <div className="relative w-full flex flex-col gap-1">
        <label {...getLabelProps()}></label>
        <div
          className="flex shadow-sm bg-white gap-0.5"
          {...getComboboxProps()}
        >
          <TextInput
            id="searchText"
            type="text"
            placeholder="Search authority inherit"
            {...getInputProps({
              onKeyDown: event => {
                if (event.key === "Enter") {
                  if (!isOpen && items.length === 0) {
                    event.preventDefault();
                  } else if (isOpen && !selectedItem) {
                    event.preventDefault();
                  }
                }
              },
            })}
          />
          <button
            aria-label="add button"
            className="px-2 bg-blue-400 text-white"
            type="button"
            onClick={onAddAuthority}
          >
            Add
          </button>
        </div>
        <ul
          {...getMenuProps()}
          className={`absolute w-full mt-14 bg-white max-h-80 overflow-y-auto ${
            isOpen && "border"
          }`}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={`
                  ${highlightedIndex === index && "bg-blue-300"}
                  ${selectedItem === item && "font-bold"}
                  py-2 px-3 shadow-sm flex flex-col
                `}
                key={`${item.code}${index}`}
                {...getItemProps({
                  item,
                  index,
                })}
              >
                <span>{item.code}</span>
                <span className="text-sm text-gray-700">{item.name}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default observer(AuthorityInherits);
