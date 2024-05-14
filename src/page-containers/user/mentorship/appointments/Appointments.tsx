/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
"use client"
import { Image } from '@/components/ui/Images';
import { Box, Flex, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

const Appointments = () => {
    const router = useRouter();
    const cardData = [
      {
        id: 1,
        name: "James Smith",
        date: "07 April 2024",
        time: "3:00 pm - 4:00 pm",
      },
      {
        id: 2,
        name: "Arthur Lee",
        date: "07 April 2024",
        time: "3:00 pm - 4:00 pm",
      },
      {
        id: 3,
        name: "Arthur Lee",
        date: "07 April 2024",
        time: "3:00 pm - 4:00 pm",
      },
      {
        id: 4,
        name: "Sharon Kim",
        date: "07 April 2024",
        time: "3:00 pm - 4:00 pm",
      },
    ];

    const handleNext = (_:undefined) =>{
       router.push("appointments/appointments-details");
    }
  return (
    <>
      <Box className="p-2">
        <Flex className=" justify-between">
          <Box>
            <Text className="block text-[24px] font-[700] text-[#373A36]">Appointments</Text>
            <Text className="block text-[10px] font-[400] text-[#373A36]">There are over 10 mentors on TEE-UP.</Text>
          </Box>
          <Box>
            <Image src="/uploads/images/layer.png" className="mt-5" width={17} height={17} alt={""} />
          </Box>
        </Flex>
        <Box className="mt-7">
          {cardData &&
            cardData?.map((item, index) => (
              <Box onClick={()=>handleNext(undefined)} key={index} className=" bg-white p-3 mt-3  rounded-[8px]">
                <Text className="block text-[18px] font-[600] text-[#373A36]">
                  Mentorship session with <span className="text-primary">{item.name}</span>
                </Text>
                <Text className="block text-[14px] font-[300] mt-1 text-[#373A36]">
                  Date: <span className="text-[#373A36] font-[400] ms-3">{item.date}</span>
                </Text>
                <Text className="block text-[14px] font-[300] mt-1 text-[#373A36]">
                  Time: <span className="text-[#373A36] font-[400] ms-3">{item.time}</span>
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default Appointments