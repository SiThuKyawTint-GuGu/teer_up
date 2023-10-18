import BlogPostDetail from "@/page-containers/admin/post/blogPostDetail";
interface Props {
  params: { id: string };
}
const BlogPostDetailPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <BlogPostDetail id={id} />
    </div>
  );
};

export default BlogPostDetailPage;
