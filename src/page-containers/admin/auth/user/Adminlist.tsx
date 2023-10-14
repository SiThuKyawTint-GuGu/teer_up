'use client';
import UserTable from '@/components/ui/Table/UserTable';
import { ParamsType, useGetUser } from '@/services/user';
import { USER_ROLE } from '@/shared/enums';
import { UserResponse } from '@/types/User';
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

const AdminList = () => {
  const { data: userData = [] } = useGetUser<ParamsType, UserResponse>({
    role: USER_ROLE.ADMIN,
  });

  console.log('data => ', userData);

  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />}
      </Box>
    </>
  );
};

export default AdminList;
