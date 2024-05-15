import BrowsePage from "@/page-containers/user/browse";
import { NextPage } from "next";
export const metadata = {
  title: "Home",
  openGraph: {
    title: "Home",
  },
};
const Home: NextPage = () => {
  return (
    // <MainPageLayout>
    <BrowsePage />
    // </MainPageLayout>
  );
};

export default Home;
