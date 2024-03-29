import { XCircleIcon, XIcon } from "@heroicons/react/solid";
import { AddButton } from "components/widgets/forms";
import Downshift, { GetInputPropsOptions } from "downshift";
import { Authority } from "lib/services/authority";
import useServices from "lib/services/provider";
import { FC, ReactElement, Ref, useCallback, useEffect, useState } from "react";
import tw from "tailwind-styled-components";

// Downshift issue: https://github.com/downshift-js/downshift/issues/718
interface GetInputPropsOptionsRef extends GetInputPropsOptions {
  ref?: Ref<HTMLInputElement>;
}

type AuthorityInheritsProps = {
  values: string[];
  onAdd: (authorityId: string) => void;
  onDelete: (authorityId: string) => void;
};

const AuthorityInherits: FC<AuthorityInheritsProps> = ({
  values = [],
  onAdd,
  onDelete,
}) => {
  const { authorityService } = useServices();
  const [inherits, setInherits] = useState<Authority[]>([]);
  const [addMode, setAddMode] = useState(false);

  const itemToString = (item: Authority | null) => {
    return item ? item.name : "";
  };

  useEffect(() => {
    async function getAllAuthorities() {
      const authorities = Array<Authority>();
      await Promise.all(
        values.map(async id => {
          const result = await authorityService.getAuthority(id);
          if (!result.error && result.data) {
            authorities.push(result.data);
          }
        })
      );
      setInherits(authorities);
    }
    getAllAuthorities();
  }, [authorityService, values]);

  return (
    <>
      <div
        className={`text-gray-900 bg-white ${
          inherits.length > 0 && "border"
        } px-2 border-gray-200 rounded-md`}
      >
        {inherits.map(authority => {
          return (
            <button
              key={authority.id}
              type="button"
              className="relative inline-flex items-center w-full px-1 py-2 text-sm font-medium border-b last:border-0 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            >
              <span className="flex-grow text-left">{authority.name}</span>
              <XCircleIcon
                className=" w-5 h-5 text-[#DA3535] hover:text-red-800 cursor-pointer"
                onClick={() => onDelete(authority.id)}
              />
            </button>
          );
        })}
      </div>

      <Downshift
        itemToString={itemToString}
        onChange={selection => {
          if (selection) {
            onAdd(selection.id);
            setAddMode(false);
          }
        }}
      >
        {({
          inputValue,
          getInputProps,
          getLabelProps,
          getMenuProps,
          getItemProps,
          selectedItem,
          highlightedIndex,
          isOpen,
          clearSelection,
        }) => (
          <div className="relative w-full flex flex-col gap-1">
            <label {...getLabelProps()}></label>
            {addMode ? (
              <div
                className="flex gap-0.5 items-stretch shadow
                        appearance-none
                        border
                        rounded
                        w-full
                        py-2
                        px-3
                        text-grey-darker"
              >
                <input
                  className="flex-grow focus:outline-none"
                  {...(getInputProps({
                    placeholder: "type to search",
                  }) as GetInputPropsOptionsRef)}
                />
                {selectedItem && (
                  <XIcon
                    className="h-4 w-4 text-gray-500 mt-1"
                    onClick={() => clearSelection()}
                  />
                )}
              </div>
            ) : (
              <AddButton
                onClick={() => {
                  clearSelection();
                  setAddMode(true);
                }}
              />
            )}
            <ul
              {...getMenuProps()}
              className={`absolute w-full mt-14 bg-white max-h-80 overflow-y-auto z-[1001] ${
                isOpen && "border"
              }`}
            >
              {(() => {
                if (!isOpen) {
                  return null;
                }
                if (!inputValue) {
                  return (
                    <AuthorityItem>
                      You have to enter a search query
                    </AuthorityItem>
                  );
                }
                return (
                  <AuthoritiesQuery searchText={inputValue}>
                    {({ data, error, loading }) => {
                      if (loading) {
                        return <AuthorityItem>Loading...</AuthorityItem>;
                      }
                      if (error) {
                        return <AuthorityItem>Error! ${error}</AuthorityItem>;
                      }
                      if (!data.length) {
                        return <AuthorityItem>No data found</AuthorityItem>;
                      }
                      return (
                        <>
                          {data.map((item, index) => (
                            <AuthorityItem
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
                              <span className="text-sm text-gray-700">
                                {item.name}
                              </span>
                            </AuthorityItem>
                          ))}
                        </>
                      );
                    }}
                  </AuthoritiesQuery>
                );
              })()}
            </ul>
          </div>
        )}
      </Downshift>
    </>
  );
};

const AuthorityItem = tw.li`py-2 px-3 shadow-sm flex flex-col`;

let timer: NodeJS.Timeout;
const debounce = (func: () => void, timeout = 300) => {
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

type AuthoritiesQueryProps = {
  searchText: string;
  children: (props: AuthoritiesQueryState) => ReactElement;
};

type AuthoritiesQueryState = {
  data: Authority[];
  loading: boolean;
  error: string;
};

const AuthoritiesQuery: FC<AuthoritiesQueryProps> = ({
  children,
  searchText,
}) => {
  const { authorityService } = useServices();
  const [{ data, loading, error }, setState] = useState<AuthoritiesQueryState>({
    data: [],
    loading: false,
    error: "",
  });

  const fetchData = useCallback(
    (q: string) => {
      setState({ data: [], error: "", loading: true });
      debounce(() => {
        authorityService
          .lookupAuthorities(10, 0, q)
          .then(result => {
            if (result.error) {
              setState({
                data: [],
                loading: false,
                error: result.error,
              });
            } else {
              setState({
                data: result.items || [],
                loading: false,
                error: "",
              });
            }
          })
          .catch(() => {
            setState({
              data: [],
              loading: false,
              error: "Server error",
            });
          });
      }, 300)();
    },
    [authorityService]
  );

  useEffect(() => {
    fetchData(searchText);
  }, [fetchData, searchText]);

  return children({
    data,
    loading,
    error,
  });
};

export default AuthorityInherits;
