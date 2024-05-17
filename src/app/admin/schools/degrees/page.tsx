import { Box } from "@mui/material";

import AllDegreeTable from "@/page-containers/admin/schools/degree/allDegreeTable";

export default function DegreesPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        pb: 4,
        maxWidth: "lg",
      }}
    >
      <AllDegreeTable />
    </Box>
  );
}
