import CategoryTable from "@/page-containers/admin/contentCategory";
import { Box } from "@radix-ui/themes";
import { NextPage } from "next";

const CategoryPage: NextPage = () => {
  return (
    <Box className="bg-white pt-5 px-2 h-full rounded-md">
      <CategoryTable />
    </Box>
  );
};

export default CategoryPage;
