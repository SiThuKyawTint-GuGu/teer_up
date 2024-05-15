import Schools from "@/page-containers/admin/schools";
import { Box } from "@mui/material";

export default function SchoolPage() {
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 200px)",
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <Schools />
    </Box>
  );
}
