import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import Image from "next/image";
import React from "react";
import QuestionPageCard from "../components/QuestionPageCard";

const ExplorePage: React.FC = () => {
  return (
    <QuestionPageCard title="Discover your Career attitude">
      <Text as="p" className="text-slateGray text-16px leading-[28px]">
        Explore your thoughts and feelings about career choices and the world of work.
      </Text>
      <div className="my-5 flex justify-center items-center flex-wrap gap-y-5 flex-col">
        <Image src="/personalize/welcome.png" width={200} height={168} alt="welcome" />
        <Button className="w-full">
          Explore
          <Icons.rightArrow className="w-4 h-4 ms-1" />
        </Button>
      </div>
    </QuestionPageCard>
  );
};

export default ExplorePage;
