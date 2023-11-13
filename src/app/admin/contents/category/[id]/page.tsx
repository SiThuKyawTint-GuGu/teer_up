import ContentCategoryDetail from "@/page-containers/admin/contentCategory/contentCategoryDetail";

interface Props {
  params: { id: string };
}
const ContentCategory = ({ params: { id } }: Props) => {
  return <ContentCategoryDetail id={id} />;
};

export default ContentCategory;
