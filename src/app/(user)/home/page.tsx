import BottomNavbar from "@/components/userLayout/BottomNavbar";
import Header from "@/components/userLayout/Header";
import UserContent from "@/page-containers/user/content";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <UserContent />
      <BottomNavbar />
    </>
  );
};

export default Home;
