import MentorshipTable from "@/page-containers/admin/mentorship";

const MentorshipPage = () => {
  return (
    <div className="px-2 pt-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
      <MentorshipTable />
    </div>
  );
};

export default MentorshipPage;
