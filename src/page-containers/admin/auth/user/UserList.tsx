"use client";
import UserTable from "@/components/ui/Table/UserTable";
import { ParamsType, useGetUser } from "@/services/user";
import { ROLES } from "@/shared/enums";
import { UserResponse } from "@/types/User";
import { Box } from "@radix-ui/themes";
import { UserColumns } from "./UserColumns";

const UserList = () => {
  const { data: userData } = useGetUser<ParamsType, UserResponse>({
    role: ROLES.USER,
  });

  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />}
      </Box>
    </>
  );
};

export default UserList;
