import { getToken } from "@/utils/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const token = getToken();
  if (!token) {
    redirect("/auth/signup");
  }
  return redirect("/home");
};

export default Home;
