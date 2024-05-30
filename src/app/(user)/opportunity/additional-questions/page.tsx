"use client"
import MainPageLayout from "@/components/userLayout/MainPageLayout";
import { useStore } from "@/lib/store";
import AdditionalQuestions from "@/page-containers/user/opportunity/AdditionalQuestions";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  const opportunityData = useStore(state => state.opportunityData);
  const { data, mutate, comments, setComments } = opportunityData?.someData || {};

  return (
    <MainPageLayout hideHeader={true}>
      <AdditionalQuestions data={data} mutate={mutate} comments={comments} setComments={setComments} />
    </MainPageLayout>
  );
};

export default Notifications;
