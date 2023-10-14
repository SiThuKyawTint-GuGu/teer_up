import { Column } from 'react-table';

export const UserColumns: Column[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Verify',
    accessor: 'url',
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
  },
];
