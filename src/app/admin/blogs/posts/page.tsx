import BlogTable from "@/page-containers/admin/post/blogPostTable";
import { Box } from "@mui/material";

const PostsPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <BlogTable />
    </Box>
  );
};

export default PostsPage;
