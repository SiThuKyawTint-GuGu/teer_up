import Dimension from "@/page-containers/admin/dimension";
import { Box } from "@mui/material";

const DimensionPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Dimension />
    </Box>
  );
};

export default DimensionPage;
