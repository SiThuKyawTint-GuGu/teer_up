import ContentTable from "@/page-containers/admin/content/contentTable";
import { Box } from "@radix-ui/themes";

const ContentPage = () => {
  return (
    <Box className="bg-white p-5 rounded-md">
      <ContentTable />
    </Box>
  );
};

export default ContentPage;
