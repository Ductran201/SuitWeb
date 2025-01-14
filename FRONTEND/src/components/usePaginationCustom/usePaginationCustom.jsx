import { useSearchParams } from "react-router-dom";

export default function usePaginationCustom(defaults = {}) {
  const [paginationParams, setPaginationParams] = useSearchParams();

  const updatePaginationParams = (updates) => {
    setPaginationParams({
      ...defaults,
      ...Object.fromEntries(paginationParams.entries()),
      ...updates,
    });
  };
  return {
    handleSearch: (e) =>
      updatePaginationParams({ page: 1, search: e.target.value }),
    handleChangePage: (e, value) => updatePaginationParams({ page: value }),

    handleChangeSize: (newSize) => updatePaginationParams({ size: newSize }),

    handleSelectFilter: (field, direction) =>
      updatePaginationParams({
        sortField: field,
        sortDirection: direction,
      }),
  };
}
