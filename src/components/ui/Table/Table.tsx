"use client";
import { useMemo } from "react";
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

import Filter from "./Filter";

interface Props {
  tableColumns: any[];
  tableData: any[];
}

const Table: React.FC<Props> = ({ tableColumns, tableData }: Props) => {
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance as any;

  console.log(tableInstance.headerGroups);

  const { globalFilter, pageIndex } = state as any;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <div></div>
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map((headerGroup: any, key: number) => (
            // eslint-disable-next-line react/jsx-key
            <tr key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className="p-4 pb-5 border-b text-gray-800 font-normal text-left"
                >
                  {column.render("Header")}

                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, key: number) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr key={key} {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td key={cell.id} className="p-5 border-b">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="m-5 flex justify-between">
        <div>
          <div className="flex mr-4 py-4">
            <span className="text-gray-600 mr-2">Total Page</span>
            <p className="font-bold">
              {pageIndex + 1} of {pageOptions.length}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="px-3 py-2 rounded bg-gray-200 mr-2 cursor-pointer"
            onClick={() => previousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-3 py-2 rounded bg-gray-200 cursor-pointer"
            onClick={() => nextPage()}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
