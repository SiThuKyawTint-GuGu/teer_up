import DynamicFormDetailConfig from "@/page-containers/company/dynamic-form/DynamicFormDetailConfig";
import { Box } from "@mui/material";

interface Props {
  params: { id: string };
}
const DynamicFormConfigDetail = ({ params: { id } }: Props) => {
  return (
    <Box
      sx={{
        marginTop: 3,
      }}
    >
      <DynamicFormDetailConfig id={id} />
    </Box>
  );
};

export default DynamicFormConfigDetail;
