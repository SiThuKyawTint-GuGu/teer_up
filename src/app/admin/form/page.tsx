import FormConfigTable from "@/page-containers/admin/form/formTable";
import { Box } from "@mui/material";

const FormPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <FormConfigTable />
    </Box>
  );
};

export default FormPage;
