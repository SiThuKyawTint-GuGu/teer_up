import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { Grid } from "@radix-ui/themes";
import { NextPage } from "next";

const ArticleDetail: NextPage = () => {
  return (
    <Grid columns="1">
      <ContentDetailHeader pathname="/home" title="Article Detail" />
      <UserContentDetail />
    </Grid>
  );
};

export default ArticleDetail;
