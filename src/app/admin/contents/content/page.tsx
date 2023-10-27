import ContentTable from "@/page-containers/admin/content/contentTable";
import { Box } from "@mui/material";

const ContentPage = () => {
  return (
    <Box className="pt-2 px-2 h-full rounded-md">
      <ContentTable />
    </Box>
  );
};

export default ContentPage;
