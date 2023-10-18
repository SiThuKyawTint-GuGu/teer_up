"use client";
import Table from "@/components/ui/Table";
import { Box } from "@radix-ui/themes";

const AdminList: React.FC = () => {
  // const { data: userData } = useGetUser<ParamsType, UserResponse>({
  //   role: ROLES.ADMIN,
  // });

  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        {/* {userData?.data && <UserTable tableColumns={UserColumns} tableData={userData?.data} />} */}
        <Table />
      </Box>
    </>
  );
};

export default AdminList;
