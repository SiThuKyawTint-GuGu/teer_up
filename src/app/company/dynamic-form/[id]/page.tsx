import DynamicFormDetailConfig from "@/page-containers/company/dynamic-form/DynamicFormDetailConfig";

interface Props {
  params: { id: string };
}
const DynamicFormConfigDetail = ({ params: { id } }: Props) => {
  return (
    <div>
      <DynamicFormDetailConfig id={id} />
    </div>
  );
};

export default DynamicFormConfigDetail;
