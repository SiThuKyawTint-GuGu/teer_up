import CompanyAdminTable from "@/page-containers/admin/company/CompanyAdminTable";
import { Box } from "@mui/material";

export default function CompanyAdminsPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <CompanyAdminTable />
    </Box>
  );
}
