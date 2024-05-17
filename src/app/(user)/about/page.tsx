import MainPageLayout from "@/components/userLayout/MainPageLayout";
import About from "@/page-containers/about";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <About />
    </MainPageLayout>
  );
};

export default AboutPage;
