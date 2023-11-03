import DimensionDetailPage from "@/page-containers/admin/dimension/dimentionDetail";

interface Props {
  params: { id: string };
}

const DimentionDetail = ({ params: { id } }: Props) => {
  return (
    <div>
      <DimensionDetailPage id={id} />
    </div>
  );
};

export default DimentionDetail;
