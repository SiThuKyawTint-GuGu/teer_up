"use client";
import AdminTable from "@/components/ui/Table";
import { Box } from "@radix-ui/themes";

const AdminList: React.FC = () => {
  return (
    <>
      <Box className="pt-5 px-2">
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <AdminTable />
      </Box>
    </>
  );
};

export default AdminList;
