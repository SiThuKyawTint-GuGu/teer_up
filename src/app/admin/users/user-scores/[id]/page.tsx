import UserScoreTable from "@/page-containers/admin/userScore";

interface Props {
  params: { id: string };
}

const UserScore = ({ params: { id } }: Props) => {
  return (
    <div className="px-2 pt-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
      <UserScoreTable id={id} />
    </div>
  );
};

export default UserScore;
