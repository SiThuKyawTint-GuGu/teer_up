"use client";
import UserTable from "@/components/ui/Table/UserTable";
import { Box } from "@mui/material";

const UserList = () => {
  return (
    <>
      <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <UserTable />
      </Box>
    </>
  );
};

export default UserList;
