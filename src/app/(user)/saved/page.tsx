import MainPageLayout from "@/components/userLayout/MainPageLayout";
import SavedList from "@/page-containers/user/saved/SavedList";
import { NextPage } from "next";

const SavedPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader={false}>
      <SavedList />
    </MainPageLayout>
  );
};

export default SavedPage;
