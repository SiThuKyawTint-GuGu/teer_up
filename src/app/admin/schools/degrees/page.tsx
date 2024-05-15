import { Box } from "@mui/material";

import AllDegreeTable from "@/page-containers/admin/schools/degree/allDegreeTable";

export default function DegreesPage() {
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 200px)",
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <AllDegreeTable />
    </Box>
  );
}
