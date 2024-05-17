import React from "react";
import HeaderChat from "../components/HeaderChat";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Image } from "@/components/ui/Images";
import { Button } from "@/components/ui/Button";

const AppointmentChat = () => {
  return (
    <div className="relative w-[100%]">
      <HeaderChat text={" James Smith"} />
      <Box className=" fixed bottom-0 bg-[#F6F6F6] border-t-2 p-3">
        <Flex className="">
          <Flex className="bg-white w-[287px] h-[35px] rounded-[160px]">
            <input
              placeholder="Write a message…"
              className="w-[237px] bg-white rounded-s-[160px] px-4 active:border-none"
            />
            <Box className="mt-2">
              <Image src="/uploads/images/camera.png" width={23} height={19} alt={""} />
            </Box>
          </Flex>
          <Flex className="ms-5">
            <Box className="mt-2 w-[25px]">
              <Image src="/uploads/images/plus.png" width={18} height={18} alt={""} />
            </Box>
            <Box className="mt-2  w-[25px] ms-4">
              <Image src="/uploads/images/send.png" width={18} height={18} alt={""} />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Box className="w-full flex justify-end ">
          <Text className="text-start text-[16px] font-[400] w-[60%] text-white  bg-primary p-2 rounded-[15px] rounded-br-none">
            Lorem ipsum do amet ipsum mattis ipsum dolor sit am Lorem ipsum do amet ipsu
          </Text>
        </Box>
        <Box className="w-full flex justify-start pt-[20px]">
          <Text
            style={{ borderWidth: 1 }}
            className=" w-[60%] bg-[#EFF0F1] border-[#00000020] p-2 rounded-[15px] rounded-bl-none text-start text-[16px] font-[400] text-[##2A2A2A]"
          >
            Lorem ipsum do amet ipsum mattis ipsum dolor sit am Lorem ipsum do amet ipsu
          </Text>
        </Box>
        <Box className="w-full flex justify-end pt-[20px]">
          <Box style={{ borderWidth: 1 }} className="w-[70%] bg-[#EFF0F1] border-[#00000020]  p-5 rounded-[15px] ">
            <Box className="w-full flex justify-end pt-[5px]">
              <Box className="w-[100%] bg-primary p-2 rounded-[15px] rounded-br-none">
                <Text className=" text-[16px] font-[400] text-white">
                  Su Lay has requested for an appointment on Date / Time
                </Text>
              </Box>
            </Box>
            <Flex className="gap-4 mt-3 ">
              <Button className="w-full h-[40px]  bg-primary p-2 rounded-[15px] rounded-br-none  text-[15px] font-[400] ">
                Accept
              </Button>
              <Button className="w-full h-[40px]  bg-primary p-2 rounded-[15px] rounded-br-none   text-[15px] font-[400]">
                Decline
              </Button>
            </Flex>
            <Button className="w-full h-[40px] mt-3  bg-primary p-2 rounded-[15px] text-[15px] font-[400] rounded-br-none ">
              Propose Alternative
            </Button>
          </Box>
        </Box>
        <Box className="w-full flex justify-start pt-[20px]">
          <Text
            style={{ borderWidth: 1 }}
            className="text-start text-[16px] font-[400] text-[##2A2A2A] bg-[#EFF0F1] border-[#00000020] p-2 rounded-[15px] rounded-bl-none"
          >
            Propose Alternative
          </Text>
        </Box>
        <Box className="w-full flex justify-end pt-[20px]">
          <Text className="text-start text-[16px] font-[400] text-white  bg-primary p-2 rounded-[15px] rounded-br-none">
            Select Your Date & Time
          </Text>
        </Box>
        <Box className="w-full flex justify-start pt-[20px]">
          <Text
            style={{ borderWidth: 1 }}
            className="text-start text-[16px] font-[400] text-[##2A2A2A] bg-[#EFF0F1] border-[#00000020] p-2 rounded-[15px] rounded-bl-none"
          >
            12 MAY 2024, 9:41AM
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default AppointmentChat;
