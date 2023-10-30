import ContentTable from "@/page-containers/admin/content/contentTable";
import { Box } from "@mui/material";

const ContentPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <ContentTable />
    </Box>
  );
};

export default ContentPage;
