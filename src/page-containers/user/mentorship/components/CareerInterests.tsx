import { MentorSearchList } from "./MentorSearchList";

export const CareerInterests = () => {
  const careers = [{ name: "Animation" }, { name: "Art" }, { name: "Human Resource" }];

  return (
    <>
      <MentorSearchList title={"Career Interest"} data={careers} />
    </>
  );
};
