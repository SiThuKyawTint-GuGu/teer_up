import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { Grid } from "@radix-ui/themes";
import { NextPage } from "next";

const ContentDetail: NextPage = () => {
  return (
    <Grid columns="1">
      <UserContentDetail />
    </Grid>
  );
};

export default ContentDetail;
