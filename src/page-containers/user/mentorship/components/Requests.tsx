/* eslint-disable react/jsx-key */
import { Image } from "@/components/ui/Images";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Requests = () => {
  const mentorData = [
    {
      id: 1,
      name: "Omowumi John",
      time: "09:34 PM",
      status: "pending",
    },
    {
      id: 2,
      name: "Omowumi John",
      time: "09:34 PM",
      status: "pending",
    },
    {
      id: 3,
      name: "Omowumi John",
      time: "09:34 PM",
      status: "pending",
    },
    {
      id: 4,
      name: "Omowumi John",
      time: "09:34 PM",
      status: "pending",
    },
  ];
  return (
    <>
      <Box className="mt-5">
        <Box>
          {mentorData &&
            mentorData.map((item, index) => (
              <Flex key={index} className=" justify-between bg-white p-3 mt-3 rounded-[8px]">
                <Box className="flex">
                  <Box className=" relative">
                    <Image src="/uploads/images/mush.png" className="rounded-[50%]" width={56} height={56} alt={""} />
                    <div className="w-[12px] h-[12px] bg-[#34A853] rounded-[50%] absolute bottom-0 right-1"></div>
                  </Box>
                  <Box className="ms-2 mt-1">
                    <Text className="block text-[16px] font-[600] text-[#373A36] mb-0">{item?.name}</Text>
                    <Text
                      className={`text-[12px] font-[600] ${
                        item?.status === "pending" && "text-[#FBBC05]"
                      }`}
                    >
                      {item?.status}
                    </Text>
                  </Box>
                </Box>
                <Box className="ms-2">
                  <Text className="block text-[12px] font-[400] text-[#373A36] mb-0">{item?.time}</Text>
                </Box>
              </Flex>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Requests;
