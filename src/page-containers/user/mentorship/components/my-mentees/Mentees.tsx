/* eslint-disable react/jsx-key */
import { Image } from "@/components/ui/Images";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Mentees = () => {
  const mentorData = [
    {
      id: 1,
      name: "Omowumi John",
      title: "Designer Expect",
      time: "09:34 PM",
      status: "new",
    },
    {
      id: 2,
      name: "Omowumi John",
      title: "Perfect I will check it late.....",
      time: "09:34 PM",
      status: "",
    },
    {
      id: 3,
      name: "Omowumi John",
      title: "Perfect I will check it late.....",
      time: "09:34 PM",
      status: "",
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
                    <Flex className="gap-2">
                      <Text className="text-[12px] font-[400] text-[#373A36]">{item?.title}</Text>
                      {item?.status === "new" && (
                        <Text className="text-[#05A660] text-[10px] px-1 rounded-[6px] bg-[#EBF8F1] font-[400] lh-[36px]">
                          New
                        </Text>
                      )}
                    </Flex>
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

export default Mentees;
