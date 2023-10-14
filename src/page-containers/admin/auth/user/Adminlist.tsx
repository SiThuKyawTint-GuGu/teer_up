'use client';
import UserTable from '@/components/ui/Table/UserTable';
import { useStore } from '@/lib/store';
import { ParamsType, useGetUser } from '@/services/user';
import { USER_ROLE } from '@/shared/enums';
import { UserResponse } from '@/types/User';
import { Box } from '@radix-ui/themes';
import { useEffect } from 'react';
import { UserColumns } from './UserColumns';

const AdminList = () => {
  const { data: userData, mutate } = useGetUser<ParamsType, UserResponse>({
    role: USER_ROLE.ADMIN,
  });
  const { refetch, toggleUpdated } = useStore(state => state);

  useEffect(() => {
    mutate();
    toggleUpdated(false);
  }, [mutate, refetch, toggleUpdated]);

  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />}
      </Box>
    </>
  );
};

export default AdminList;
