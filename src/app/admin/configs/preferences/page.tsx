import Preferences from "@/page-containers/admin/preferences";
import { Box } from "@mui/material";

const PreferencesPage = () => {
  return (
    <Box className="pt-2 px-2" sx={{ maxHeight: "calc(100vh - 200px)" }}>
      <Preferences />
    </Box>
  );
};

export default PreferencesPage;
