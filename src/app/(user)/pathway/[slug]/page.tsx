import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import PathwayDetail from "@/page-containers/user/content/components/PathwayDetail";
import { Grid } from "@radix-ui/themes";

const PathwayPage = () => {
  return (
    <Grid columns="1">
      <ContentDetailHeader title="Pathway Detail" />
      <div className="pt-[48px] w-full h-full">
        <PathwayDetail />
      </div>
    </Grid>
  );
};

export default PathwayPage;
