"use client"
import { Button } from '@/components/ui/Button';
import { Box, Flex, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import Mentors from '../components/Mentors';
import Connections from '../components/Connections';
import Requests from '../components/Requests';

const MyMentor = () => {
    const [activeButton, setActiveButton] = useState("mentors");

    const handleButtonClick = (button : string) => {
      setActiveButton(button);
    };
    
  return (
    <>
      <Box className="p-3">
        <Text className="text-[24px] font-[700] text-[#373A36]">My Mentors</Text>
        <Flex className="gap-2 mt-2">
          <Button
            className={`w-full rounded-none bg-transparent ${
              activeButton === "mentors"
                ? " text-primary font-[600] border-b-2 border-primary"
                : " text-[#373A36] font-[300]"
            } text-[16px] shadow-none  hover:bg-transparent`}
            onClick={() => handleButtonClick("mentors")}
          >
            Mentors
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
              activeButton === "requests"
                ? " text-primary font-[600] border-b-2 border-primary"
                : " text-[#373A36] font-[300]"
            } text-[16px] shadow-none  hover:bg-transparent`}
            onClick={() => handleButtonClick("requests")}
          >
            Requests
          </Button>
        </Flex>
        <Box>
          {activeButton === "mentors" && <Mentors />}
          {activeButton === "connections" && <Connections />}
          {activeButton === "requests" && <Requests />}
        </Box>
      </Box>
    </>
  );
}

export default MyMentor