import { useMaterialReactTable } from "material-react-table";

const useTableOptions = () => {
  const table = useMaterialReactTable({
    enableStickyHeader: true,
    columns: [],
    data: [],
  });

  return { table };
};

export default useTableOptions;
