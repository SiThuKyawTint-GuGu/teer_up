import BottomNavbar from "@/components/userLayout/BottomNavbar";
import Header from "@/components/userLayout/Header";
import BrowsePage from "@/page-containers/user/browse";
import { NextPage } from "next";

const Browse: NextPage = () => {
  return (
    <>
      <Header />
      <BrowsePage />
      <BottomNavbar />
    </>
  );
};

export default Browse;
