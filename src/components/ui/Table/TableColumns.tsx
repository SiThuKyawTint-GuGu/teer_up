import { Column } from 'react-table';

export const Columns: Column[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
    Cell: () => {
      return <div>testing</div>;
    },
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
  },
  {
    Header: 'Action',
    accessor: '',
  },
];
