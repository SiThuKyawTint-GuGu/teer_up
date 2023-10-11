'use client';
import React, { useMemo } from 'react';
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import Filter from './Filter';

interface Props {
  tableColumns: Column[];
  tableData: any[];
}

const Table = ({ tableColumns, tableData }: Props) => {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);

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
    page,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <div></div>
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className="p-4 pb-5 border-b text-gray-800 font-normal text-left"
                >
                  {column.render('Header')}

                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <div key={cell.id} className="p-5 border-b text-gray-500 font-light text-sm">
                    {cell.render('Cell')}
                  </div>
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
            {'<'}
          </button>
          <button
            className="px-3 py-2 rounded bg-gray-200 cursor-pointer"
            onClick={() => nextPage()}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
