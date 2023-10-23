import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { Grid } from "@radix-ui/themes";
import { NextPage } from "next";

const ContentDetail: NextPage = () => {
  return (
    <Grid columns="1">
      <div className="absolute  w-full left-0 top-0 z-[9999] flex flex-wrap">
        <ContentDetailHeader pathname="/home" title="Event Detail" />
      </div>
      <UserContentDetail />
    </Grid>
  );
};

export default ContentDetail;
