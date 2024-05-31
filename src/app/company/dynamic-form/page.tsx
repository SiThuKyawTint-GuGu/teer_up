import DynamicFormTable from "@/page-containers/company/dynamic-form/DynamicFormTable";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const DynamicFormPage = () => {
  return (
    <Box sx={{ marginTop: 6 }}>
      {/* header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 2,
        }}
      >
        Question Form
      </Typography>

      <DynamicFormTable />
    </Box>
  );
};

export default DynamicFormPage;
