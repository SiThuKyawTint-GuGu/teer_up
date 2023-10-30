"use client";
import AdminTable from "@/components/ui/Table";
import { Box } from "@mui/material";

const AdminList: React.FC = () => {
  return (
    <>
      <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <AdminTable />
      </Box>
    </>
  );
};

export default AdminList;
