"use client";
import { Button } from "@/components/ui/Button";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import Connections from "../components/my-mentees/Connections";
import Mentees from "../components/my-mentees/Mentees";
import Request from "../components/my-mentees/Request";

const MyMentees = () => {
  const [activeButton, setActiveButton] = useState("mentees");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <>
      <Box className="p-3">
        <Text className="text-[24px] font-[700] text-[#373A36]">My Mentees</Text>
        <Flex className="gap-2 mt-2">
          <Button
            className={`w-full rounded-none bg-transparent ${
              activeButton === "mentees"
                ? " text-primary font-[600] border-b-2 border-primary"
                : " text-[#373A36] font-[300]"
            } text-[16px] shadow-none  hover:bg-transparent`}
            onClick={() => handleButtonClick("mentees")}
          >
            Mentees
          </Button>
          <Button
            className={`w-full rounded-none bg-transparent ${
              activeButton === "connections"
                ? " text-primary font-[600] border-b-2 border-primary"
                : " text-[#373A36] font-[300]"
            } text-[16px] shadow-none  hover:bg-transparent`}
            onClick={() => handleButtonClick("connections")}
          >
            Connections
          </Button>
          <Button
            className={`w-full rounded-none bg-transparent ${
              activeButton === "request"
                ? " text-primary font-[600] border-b-2 border-primary"
                : " text-[#373A36] font-[300]"
            } text-[16px] shadow-none  hover:bg-transparent`}
            onClick={() => handleButtonClick("request")}
          >
            Request
          </Button>
        </Flex>
        <Box>
          {activeButton === "mentees" && <Mentees />}
          {activeButton === "connections" && <Connections/>}
          {activeButton === "request" && <Request />}
        </Box>
      </Box>
    </>
  );
};

export default MyMentees;
