import CategoryTable from "@/page-containers/admin/contentCategory";
import { Box } from "@radix-ui/themes";
import { NextPage } from "next";

const CategoryPage: NextPage = () => {
  return (
    <Box className="bg-white p-10 rounded-md">
      <CategoryTable />
    </Box>
  );
};

export default CategoryPage;
