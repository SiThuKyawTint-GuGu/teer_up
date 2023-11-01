import QuestionPageCard from "../components/QuestionPageCard";

const IndustryPage = () => {
  return (
    <QuestionPageCard title="Which industry are you most interested in?">
      <div className="grid grid-cols-2 gap-7 px-2 grid-flow-row">
        {dummyText.map((d: any, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center w-full h-full p-[24px]
            shadow-md bg-[#fefefe] rounded-md
            "
          >
            {d.text}
          </div>
        ))}
      </div>
    </QuestionPageCard>
  );
};

export default IndustryPage;

const dummyText = [
  {
    text: "Aviation",
  },
  {
    text: "Financial services",
  },
  {
    text: "Construction",
  },
  {
    text: "Design",
  },
  {
    text: "Engineering",
  },
  {
    text: "Healthcare",
  },
  {
    text: "Human resources",
  },
  {
    text: "Logistics & supply chain",
  },
  {
    text: "Maritime & shipping",
  },
  {
    text: "Media",
  },
  {
    text: "Pharmaceutical & bio-tech",
  },
  {
    text: "Social services",
  },
  {
    text: "Tourism & hospitality",
  },
  {
    text: "Others",
  },
];
