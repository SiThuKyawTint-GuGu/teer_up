import SignUp from "@/page-containers/user/auth/signup";
import { Metadata, NextPage } from "next";
export const metadata: Metadata = {
  title: "TeeUP - Sign Up",
  description: "Sign Up to TeeUP",
};
const SignUpPage: NextPage = () => {
  return <SignUp />;
};

export default SignUpPage;
