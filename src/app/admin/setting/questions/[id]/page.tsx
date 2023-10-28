import QuestionDetail from "@/page-containers/admin/questions/questionDetail";

interface Props {
  params: { id: string };
}

const QuestionDetailPage = ({ params: { id } }: Props) => {
  return <QuestionDetail id={id} />;
};

export default QuestionDetailPage;
