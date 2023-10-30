import Industry from "@/page-containers/admin/Industry";
import { Box } from "@mui/material";

const IndustryPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Industry />
    </Box>
  );
};

export default IndustryPage;
