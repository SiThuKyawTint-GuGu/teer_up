import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { Grid } from "@radix-ui/themes";
import { NextPage } from "next";

const EventDetail: NextPage = () => {
  return (
    <Grid columns="1">
      <ContentDetailHeader pathname="/home" title="Event Detail" />
      <UserContentDetail />
    </Grid>
  );
};

export default EventDetail;
