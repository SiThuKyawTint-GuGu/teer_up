import BlogCategory from "@/page-containers/admin/blogCategory";
import { Box } from "@mui/material";

const CategoriesPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <BlogCategory />
    </Box>
  );
};

export default CategoriesPage;
