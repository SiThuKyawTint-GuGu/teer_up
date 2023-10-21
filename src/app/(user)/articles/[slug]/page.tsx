import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { NextPage } from "next";

const ArticleDetail: NextPage = () => {
  return (
    <>
      <div className="absolute  w-full left-0 top-0 z-[9999] flex flex-wrap">
        <ContentDetailHeader pathname="/home" title="Event Detail" />
      </div>
      <UserContentDetail type="article" />
    </>
  );
};

export default ArticleDetail;
