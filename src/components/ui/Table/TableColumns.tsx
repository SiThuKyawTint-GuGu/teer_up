// 'use client';
import { Column } from 'react-table';

export const Columns: Column[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
  },
  {
    Header: 'URL',
    accessor: 'url',
  },
  {
    Header: 'Owner',
    accessor: 'owner',
  },
  {
    Header: 'Point Allocated',
    accessor: 'point_allocated',
  },
  {
    Header: 'Status',
    accessor: 'status',
    // Cell: ({ value }) => (
    //   <div
    //     className={
    //       value === 'true' ? 'bg-[#dcfce7] bold text-gray-700 rounded text-center' : 'bg-red-600'
    //     }
    //   >
    //     {value}
    //   </div>
    // ),
  },
  {
    Header: 'Action',
    accessor: '',
  },
];
