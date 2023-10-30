import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import MentorProfile from "@/page-containers/mentor/MentorProfile";

const Mentor = () => {
  return (
    <>
      <ContentDetailHeader pathname="/home" title="Mentors Detail" />
      <div className="pt-[48px]">
        <MentorProfile />
      </div>
    </>
  );
};

export default Mentor;
