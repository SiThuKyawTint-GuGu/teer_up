import SchoolAdminTable from "@/page-containers/admin/schools/admins/SchoolAdminTable";
import { Box } from "@mui/material";

export default function SchoolAdminsPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <SchoolAdminTable />
    </Box>
  );
}
