import { useCallback, useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import useServices from "lib/services/provider";
import { styledReactSelect } from "./styledReactSelect";
import useStore from "lib/store";
import { Authority } from "lib/services/authority";

type AuthorityFilterProps = {
  onChange: (value: AuthorityOption) => void;
  value?: number;
  roleRequired?: boolean;
  /** When true, user can clear the selection (e.g. optional filters). */
  isClearable?: boolean;
  onClear?: () => void;
};

type AuthorityOption = {
  id: string;
  name: string;
};

const AUTHORITY_SEARCH_DELAY_MS = 300;

const toOption = (item: Authority): AuthorityOption => ({
  id: item.id,
  name: item.name,
});

const filterAuthorities = (items: Authority[], q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) {
    return items;
  }
  return items.filter(
    item =>
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
  );
};

const AuthroitySelect: React.FC<AuthorityFilterProps> = ({
  value,
  onChange,
  roleRequired,
  isClearable,
  onClear,
}) => {
  const store = useStore();
  const { authorityService } = useServices();
  const [selected, setSelected] = useState<AuthorityOption | null>(null);
  const inheritTreeRef = useRef<Authority[] | null>(null);
  const authorityLookupTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const useInheritTree =
    Boolean(roleRequired) &&
    !store.isSuperUser &&
    (store.isRoleAdmin || store.isRoleOfficer) &&
    Boolean(store.authorityId);

  const loadInheritTree = useCallback(async () => {
    if (!store.authorityId) {
      return [];
    }
    if (inheritTreeRef.current) {
      return inheritTreeRef.current;
    }
    const tree = await authorityService.lookupAuthorityInheritsDown(
      store.authorityId.toString()
    );
    inheritTreeRef.current = tree;
    return tree;
  }, [authorityService, store.authorityId]);

  useEffect(() => {
    inheritTreeRef.current = null;
  }, [store.authorityId, roleRequired]);

  const loadAuthorityOptions = useCallback(
    async (inputValue: string) => {
      let authorities: Authority[] = [];
      if (useInheritTree) {
        authorities = filterAuthorities(await loadInheritTree(), inputValue);
      } else if (!roleRequired || store.isSuperUser) {
        authorities =
          (await authorityService.lookupAuthorities(100, 0, inputValue))
            .items || [];
      }
      return authorities.map(toOption);
    },
    [
      authorityService,
      loadInheritTree,
      roleRequired,
      store.isSuperUser,
      useInheritTree,
    ]
  );

  const loadOptions = useCallback(
    (inputValue: string, callback: (options: AuthorityOption[]) => void) => {
      if (authorityLookupTimer.current) {
        clearTimeout(authorityLookupTimer.current);
      }
      authorityLookupTimer.current = setTimeout(() => {
        void loadAuthorityOptions(inputValue)
          .then(callback)
          .catch(() => callback([]));
      }, AUTHORITY_SEARCH_DELAY_MS);
    },
    [loadAuthorityOptions]
  );

  useEffect(
    () => () => {
      if (authorityLookupTimer.current) {
        clearTimeout(authorityLookupTimer.current);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadSelected() {
      if (value == null || Number.isNaN(value)) {
        if (!cancelled) {
          setSelected(null);
        }
        return;
      }
      const id = String(value);
      if (selected?.id === id) {
        return;
      }
      let match: Authority | undefined;
      if (useInheritTree) {
        match = (await loadInheritTree()).find(item => item.id === id);
      } else {
        const result = await authorityService.getAuthority(id);
        match = result.data;
      }
      if (!cancelled && match) {
        setSelected(toOption(match));
      }
    }

    loadSelected();
    return () => {
      cancelled = true;
    };
    // selected is read to skip a redundant fetch; omit it so value changes retrigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorityService, loadInheritTree, useInheritTree, value]);

  return (
    <AsyncSelect<AuthorityOption>
      cacheOptions
      defaultOptions
      value={selected}
      isMulti={false}
      isClearable={Boolean(isClearable)}
      loadOptions={loadOptions}
      getOptionValue={(item: AuthorityOption) => item.id}
      getOptionLabel={(item: AuthorityOption) => item.name}
      styles={styledReactSelect}
      onChange={(next: AuthorityOption | null) => {
        setSelected(next);
        if (next) {
          onChange(next);
        } else if (onClear) {
          onClear();
        }
      }}
    />
  );
};

export default AuthroitySelect;
