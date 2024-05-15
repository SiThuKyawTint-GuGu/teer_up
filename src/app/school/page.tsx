import { redirect } from "next/navigation";

export default async function SchoolHome() {
  redirect("/school/dashboard");
}
