import BlogTable from "@/page-containers/admin/post/blogPostTable";
import { Box } from "@radix-ui/themes";

const PostsPage = () => {
  return (
    <Box className="bg-white p-5">
      <BlogTable />
    </Box>
  );
};

export default PostsPage;
