"use client";
import { useState } from "react";

const QuestionPage: React.FC = () => {
  const [qId, setQid] = useState<number | string | null>(null);
  return (
    <div></div>
    // <QuestionPageCard title="What brings you here today?">
    //   <div className="flex flex-col flex-wrap gap-y-10 justify-center w-full h-full">
    //     {dummyQuesiton.map((q: any, index: number) => (
    //       <div key={index} onClick={() => setQid(q.id)}>
    //         <TextBox id={qId} data={q} icon />
    //       </div>
    //     ))}
    //   </div>
    //   <Text as="p" className="text-gray-500 my-4 text-center">
    //     Tips: Choose the answer that best describes you currently.
    //   </Text>
    // </QuestionPageCard>
  );
};

export default QuestionPage;

const dummyQuesiton: any[] = [
  {
    id: 0,
    text: "I want to connect with interesting people",
  },
  {
    id: 1,
    text: "I have many interests. Help me narrow down my career options",
  },
  {
    id: 2,
    text: "I know what I want in career, but I don’t know how to get there",
  },
  {
    id: 3,
    text: "I want to get invloved in career activities like internships, hackathons, volunteering, job shadowing, etc.",
  },
  {
    id: 4,
    text: "I am lost and I don’t know what to do next",
  },
  {
    id: 5,
    text: "I am just looking around, surprise me!",
  },
];
