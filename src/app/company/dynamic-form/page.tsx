import DynamicFormTable from "@/page-containers/company/dynamic-form/DynamicFormTable";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const DynamicFormPage = () => {
  return (
    <Box sx={{ maxHeight: "calc(100vh - 200px)", marginTop: 6 }}>
      {/* header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 2,
        }}
      >
        Dynamic Form
      </Typography>

      <DynamicFormTable />
    </Box>
  );
};

export default DynamicFormPage;
