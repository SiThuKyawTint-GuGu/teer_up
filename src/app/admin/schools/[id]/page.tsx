import SchoolDetails from "@/page-containers/admin/schools/schoolDetails";

interface Props {
  params: { id: string };
}
const SchoolDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <SchoolDetails id={id} />
    </>
  );
};

export default SchoolDetailPage;
