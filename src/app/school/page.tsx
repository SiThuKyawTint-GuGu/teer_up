import { redirect } from "next/navigation";

async function SchoolHome() {
  redirect('/school/dashboard')
}

export default SchoolHome;