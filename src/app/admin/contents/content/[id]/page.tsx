import ContentDetail from "@/page-containers/admin/content/contentDetail";

interface Props {
  params: { id: string };
}
const ContentDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <ContentDetail id={id} />
    </>
  );
};

export default ContentDetailPage;
