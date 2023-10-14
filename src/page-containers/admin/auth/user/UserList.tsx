'use client';
import Table from '@/components/ui/Table/Table';
import { ParamsType, useGetUser } from '@/services/user';
import { USER_ROLE } from '@/shared/enums';
import { User } from '@/types/User';
import { Box } from '@radix-ui/themes';
import { UserColumns } from './UserColumns';

const fadeData = [
  {
    name: 'khin',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'pyae',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
];

const UserList = () => {
  const { data: userData } = useGetUser<ParamsType, User>({
    role: USER_ROLE.USER,
  });

  console.log('user data -> ', userData);

  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        <Table tableColumns={UserColumns} tableData={fadeData} />
      </Box>
    </>
  );
};

export default UserList;
