import CategoryTable from "@/page-containers/admin/contentCategory";
import { Box } from "@mui/material";
import { NextPage } from "next";

const CategoryPage: NextPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <CategoryTable />
    </Box>
  );
};

export default CategoryPage;
