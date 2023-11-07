import UserScoreTable from "@/page-containers/admin/userScore";
import React from "react";

const UserScore: React.FC = () => {
  return (
    <div className="px-2 pt-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
      <UserScoreTable />
    </div>
  );
};

export default UserScore;
