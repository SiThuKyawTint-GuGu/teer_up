"use client";
import UserTable from "@/components/ui/Table/UserTable";
import { Box } from "@radix-ui/themes";

const UserList = () => {
  return (
    <>
      <Box className="pt-5 px-2">
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <UserTable />
      </Box>
    </>
  );
};

export default UserList;
