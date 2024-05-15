import { Box } from "@mui/material";
import AllMajorsTable from "@/page-containers/admin/schools/major/allMajorsTable";

export default function MajorPage() {
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 200px)",
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <AllMajorsTable />
    </Box>
  );
}
