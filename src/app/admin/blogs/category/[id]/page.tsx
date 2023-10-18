import BlogCategoryDetail from "@/page-containers/admin/blogCategory/blogCategoryDetail";

interface Props {
  params: { id: string };
}
const BlogCategoryDetailPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <BlogCategoryDetail id={id} />
    </div>
  );
};

export default BlogCategoryDetailPage;
