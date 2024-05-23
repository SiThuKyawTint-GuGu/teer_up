import AllEducationLevelTable from "@/page-containers/admin/schools/education-level/allEducationLevelTable";
import { Box } from "@mui/material";

export default function EducationLevelPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <AllEducationLevelTable />
    </Box>
  );
}
