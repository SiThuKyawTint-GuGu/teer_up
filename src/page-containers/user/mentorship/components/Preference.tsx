import { MentorSearchList } from "./MentorSearchList";

export const Preference = () => {
  const preferences = [{ name: "Animation" }, { name: "Art" }, { name: "Human Resource" }];

  return (
    <>
      <MentorSearchList title={"Preference"} data={preferences} />
    </>
  );
};
