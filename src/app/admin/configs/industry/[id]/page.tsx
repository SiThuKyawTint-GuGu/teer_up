import IndustryDetail from "@/page-containers/admin/Industry/industryDetail";

interface Props {
  params: { id: string };
}
const IndustryDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <IndustryDetail id={id} />
    </>
  );
};

export default IndustryDetailPage;
