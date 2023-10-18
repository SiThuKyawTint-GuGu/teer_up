import FormDetailConfigPage from '@/page-containers/admin/form/formDetailConfig';

interface Props {
  params: { id: string };
}
const FormConfigDetail = ({ params: { id } }: Props) => {
  return (
    <div>
      <FormDetailConfigPage id={id} />
    </div>
  );
};

export default FormConfigDetail;
