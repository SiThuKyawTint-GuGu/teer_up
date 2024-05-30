import DynamicFormTable from "@/page-containers/company/dynamic-form/DynamicFormTable";
import { Box } from "@mui/material";

const DynamicFormPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <DynamicFormTable />
    </Box>
  );
};

export default DynamicFormPage;
