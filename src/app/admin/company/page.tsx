import { Box } from "@mui/material";
import CompanyTable from "@/page-containers/admin/company/CompanyTable";

export default function CompanyPage() {
  return (
    <Box
      sx={{
        pt: 4,
        px: 2,
        maxWidth: "lg",
      }}
    >
      <CompanyTable />
    </Box>
  );
}
