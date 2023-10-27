import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import MentorProfile from "@/page-containers/mentor/MentorProfile";

const Mentor = () => {
  return (
    <>
      <div className="absolute  w-full left-0 top-0 z-[9999] flex flex-wrap">
        <ContentDetailHeader pathname="/home" title="Event Detail" />
      </div>
      <MentorProfile />
    </>
  );
};

export default Mentor;
