"use client";
import AdminTable from "@/components/ui/Table";
import { Box } from "@radix-ui/themes";

const AdminList: React.FC = () => {
  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <AdminTable />
      </Box>
    </>
  );
};

export default AdminList;
