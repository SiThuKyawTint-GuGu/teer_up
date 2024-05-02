import Banner from "@/page-containers/admin/banners";
import { Box } from "@mui/material";

export default function BannerPage() {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Banner />
    </Box>
  );
}
