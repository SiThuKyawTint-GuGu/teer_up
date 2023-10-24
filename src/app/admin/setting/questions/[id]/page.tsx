import QuestionDetail from "@/page-containers/admin/questions/questionDetail";

interface Props {
  params: { id: string };
}

const QuestionDetailPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <QuestionDetail id={id} />
    </div>
  );
};

export default QuestionDetailPage;
