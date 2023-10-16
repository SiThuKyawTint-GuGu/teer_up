'use client';
import { Icons } from '@/components/ui/Images';
import { Text } from '@/components/ui/Typo/Text';
import QuestionPageCard from '@/page-containers/user/questions/components/QuestionPageCard';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const QuestionPage: React.FC = () => {
  const [qId, setQid] = useState<number | string | null>(null);
  return (
    <QuestionPageCard title="What brings you here today?">
      <div className="flex flex-col flex-wrap gap-y-10 justify-center w-full h-full">
        {dummyQuesiton.map((q: any, index: number) => (
          <div key={index} onClick={() => setQid(q.id)}>
            <div
              className={cn(
                'px-[24px] py-[12px] shadow-md rounded-md relative flex cursor-pointer',
                qId === q.id && 'bg-secondary border-[1px] border-primary'
              )}
            >
              <Text className="font-size-[20px] font-[600] tracking-wide flex-1">{q.text}</Text>
              {qId === q.id ? (
                <Icons.mark className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </QuestionPageCard>
  );
};

export default QuestionPage;

const dummyQuesiton: any[] = [
  {
    id: 0,
    text: 'I want to connect with interesting people',
  },
  {
    id: 1,
    text: 'I have many interests. Help me narrow down my career options',
  },
  {
    id: 2,
    text: 'I know what I want in career, but I don’t know how to get there',
  },
  {
    id: 3,
    text: 'I want to get invloved in career activities like internships, hackathons, volunteering, job shadowing, etc.',
  },
  {
    id: 4,
    text: 'I am lost and I don’t know what to do next',
  },
  {
    id: 5,
    text: 'I am just looking around, surprise me!',
  },
];
