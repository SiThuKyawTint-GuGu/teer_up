import Questions from "@/page-containers/admin/questions";
import { Box } from "@radix-ui/themes";

const QuestionPage = () => {
  return (
    <Box className="p-5 bg-white w-[980px]">
      <Questions />
    </Box>
  );
};

export default QuestionPage;
