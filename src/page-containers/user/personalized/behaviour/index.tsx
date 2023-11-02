"use client";

import React, { useState } from "react";

const BehaviourPage: React.FC = () => {
  const [questionId, setQuestionId] = useState<number | string | null>(null);
  return (
    <div></div>
    // <QuestionPageCard title="In the past 3 months ⏪, how much did you...">
    //   <div className="bg-[#fefefe] dark:bg-dark w-full flex flex-col flex-wrap gap-y-5 p-3 justify-center items-center">
    //     <div className="px-3 py-1 border-[1px] border-primary bg-secondary rounded-full">learn</div>
    //     <div className="text-[20px] font-[600] text-center">
    //       Read or watch career-related content
    //     </div>
    //     <div className="w-full  flex flex-col flex-wrap gap-y-5 justify-center items-center">
    //       {dummyQuestion.map((q: any, index: number) => (
    //         <div
    //           key={index}
    //           onClick={() => setQuestionId(q.id)}
    //           className={cn(
    //             `w-full border-[1px] border-slateGray p-2 rounded-xl text-center ${
    //               questionId === q.id && "bg-secondary border-[1px] border-primary"
    //             }`
    //           )}
    //         >
    //           {q.text}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="flex justify-center flex-wrap gap-x-2">
    //       {dummyQuestion.map((q: any, index: number) => (
    //         <div key={index}>
    //           <div
    //             className={
    //               questionId === q.id
    //                 ? "w-[20px] h-[6px] rounded-lg bg-primary"
    //                 : "bg-slateGray w-[8px] h-[8px] rounded-full"
    //             }
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </QuestionPageCard>
  );
};

export default BehaviourPage;

const dummyQuestion = [
  {
    id: 0,
    text: "😵‍💫 ​not at all",
  },
  {
    id: 1,
    text: "🙂​ ​Some",
  },
  {
    id: 2,
    text: "🤔A lot of​",
  },
];
