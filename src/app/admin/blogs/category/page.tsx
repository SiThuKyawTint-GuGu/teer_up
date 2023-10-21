import BlogCategory from "@/page-containers/admin/blogCategory";
import { Box } from "@radix-ui/themes";

const CategoriesPage = () => {
  return (
    <Box className="bg-white p-5">
      <BlogCategory />
    </Box>
  );
};

export default CategoriesPage;
