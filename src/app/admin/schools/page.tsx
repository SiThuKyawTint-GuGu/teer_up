import Schools from "@/page-containers/admin/schools/schoolTable";
import { Box } from "@mui/material";

export default function SchoolPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <Schools />
    </Box>
  );
}
