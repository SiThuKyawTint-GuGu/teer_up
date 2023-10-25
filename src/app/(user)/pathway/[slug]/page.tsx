import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import PathwayDetail from "@/page-containers/user/content/components/PathwayDetail";
import { Grid } from "@radix-ui/themes";

const PathwayPage = () => {
  return (
    <Grid columns="1">
      <ContentDetailHeader pathname="/home" title="Pathway Detail" />
      <PathwayDetail />
    </Grid>
  );
};

export default PathwayPage;
