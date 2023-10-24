import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import PathwayDetail from "@/page-containers/user/content/components/PathwayDetail";
import { Grid } from "@radix-ui/themes";

const PathwayPage = () => {
  <Grid columns="1">
    <div className="absolute  w-full left-0 top-0 z-[9999] flex flex-wrap">
      <ContentDetailHeader pathname="/home" title="Article Detail" />
    </div>
    <PathwayDetail />
  </Grid>;
};

export default PathwayPage;
