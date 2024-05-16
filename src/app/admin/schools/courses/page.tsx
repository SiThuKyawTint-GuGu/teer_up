import { Box } from "@mui/material";
import AllCoursesTable from "@/page-containers/admin/schools/courses/allCoursesTable";

export default function CoursePage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <AllCoursesTable />
    </Box>
  );
}
