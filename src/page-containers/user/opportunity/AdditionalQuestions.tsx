/* eslint-disable react/jsx-key */
"use client";
import CardBox from "@/components/ui/Card";
import { Section, Heading, Flex, Text, Box } from "@radix-ui/themes";
import { Button } from "@/components/ui/Button";
import HeaderText from "../profile/components/HeaderText";
import { useRouter } from "next/navigation";

function AdditionalQuestions() {
const router = useRouter();

    const handleNext  = (_:undefined) =>{
       console.log("next");
       router.push("application-status");
    }

  const questionsData = [
    {
      id: 1,
      question: "which country is TEE-UP based in?",
    },
    {
      id: 2,
      question: "which country is TEE-UP based in?",
    },
    {
      id: 3,
      question: "Where can I find is TEE-UP based in?",
    },
    {
      id: 4,
      question: "Which country is TEE-UP based in?",
    },
    {
      id: 5,
      question: "How does the Expected Salary Work?",
    },
    {
      id: 6,
      question: "Which country is TEE-UP based in?",
    },
    {
      id: 7,
      question: "Will filling in more data give me better me better match? ",
    },
    {
      id: 8,
      question: "How do I verify my Work Pass Status?",
    },
  ];
  return (
    <>
      <div className="flex justify-between mb-2">
        <HeaderText text={"Additional Questions"} />
      </div>
      <CardBox className=" rounded-md p-4 ">
        <Section className="bg-white" py="4" px="3">
          <Heading as="h6" size="4" align="left" mb="5">
            Frequently Ask Questions
          </Heading>
          {questionsData?.map((item, index) => (
            <Box key={index} className="border-b border-b-[#BDC7D5] pb-[25px] mb-[12px]">
              <Text className="text-[16px] font-[500]">{item.question}</Text>
            </Box>
          ))}
        </Section>
        <Flex className=" justify-end mt-10">
          <Button
            onClick={() => handleNext(undefined)}
            className="h-[40px] font-[600] text-[18px] px-[35px]"
          >
            Submit
          </Button>
        </Flex>
      </CardBox>
    </>
  );
}

export default AdditionalQuestions;
