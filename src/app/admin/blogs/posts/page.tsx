import BlogTable from "@/page-containers/admin/post/blogPostTable";
import { Box } from "@radix-ui/themes";

const PostsPage = () => {
  return (
    <Box className="pt-5 px-2">
      <BlogTable />
    </Box>
  );
};

export default PostsPage;
