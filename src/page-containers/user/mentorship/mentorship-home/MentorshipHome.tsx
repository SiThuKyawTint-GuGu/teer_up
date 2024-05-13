import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Images";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

const MentorshipHome = () => {

  return (
    <Box className="p-1">
      <Flex className="justify-center mt-[50px]">
        <Text className="text-[40px] font-[700] text-[#373A36] text-center">
          Empower your path with personalized resources{" "}
        </Text>
      </Flex>
      <Flex className="justify-center">
        <Text className="text-[18px] font-[400] text-[#373A36] text-center p-[20px] pt-1">
          Answer some questions to help us personalize resources and opportunities for you based on the{" "}
          <span className="text-primary font-[500]">Hope - Action and Career Construction Theory</span>
        </Text>
      </Flex>
      <Flex className=" justify-center">
        <Image src="/uploads/images/mentor.png" width={192} height={148} alt="check" />
      </Flex>
      <Box className="p-[20px] mt-[25px]">
        <Button
          style={{ borderWidth: 1 }}
          className="h-[44px] bg-white text-[#373A36] rounded-[8px] text-[16px] font-[400] w-full  border-[#BDC7D5]"
        >
          Career Readiness Quiz
        </Button>
        <Button
          style={{ borderWidth: 1 }}
          className="h-[44px] bg-white text-[#373A36] rounded-[8px] text-[16px] font-[400] w-full my-3  border-[#BDC7D5]"
        >
          Profile Completion
        </Button>
        <Button
          style={{ borderWidth: 1 }}
          className="h-[44px] bg-white text-[#373A36] rounded-[8px] text-[16px] font-[400] w-full  border-[#BDC7D5]"
        >
          Confidence
        </Button>
      </Box>
    </Box>
  );
};

export default MentorshipHome;
