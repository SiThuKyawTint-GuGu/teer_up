import Keywords from "@/page-containers/admin/keywords";
import { Box } from "@mui/material";

const KeywordPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Keywords />
    </Box>
  );
};

export default KeywordPage;
