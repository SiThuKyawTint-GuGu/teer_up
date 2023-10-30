import Department from "@/page-containers/admin/department";
import { Box } from "@mui/material";

const DepartmentPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Department />
    </Box>
  );
};

export default DepartmentPage;
