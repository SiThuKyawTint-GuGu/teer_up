import FormDetailConfigPage from "@/page-containers/admin/form/formDetailConfig";

interface Props {
  params: { id: string };
}
const DynamicFormConfigDetail = ({ params: { id } }: Props) => {
  return (
    <div>
      <FormDetailConfigPage id={id} />
    </div>
  );
};

export default DynamicFormConfigDetail;
