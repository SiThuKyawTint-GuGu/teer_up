import Questions from "@/page-containers/admin/questions";
import { Box } from "@radix-ui/themes";

const QuestionPage = () => {
  return (
    <Box className="pt-5 px-2 h-full w-full position-relative bg-white">
      <Questions />
    </Box>
  );
};

export default QuestionPage;
