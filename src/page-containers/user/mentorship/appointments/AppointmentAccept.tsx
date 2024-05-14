/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import HeaderText from "../../profile/components/HeaderText";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { InputTextArea } from "@/components/ui/Inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Image } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";

const AppointmentAccept = () => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const validationSchema = yup.object({
    message: yup.string().required("Message is required!"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

   const handleAcceptClick = () => {
     setShowAcceptModal(true);
   };

   const handleAcceptCloseModal = () => {
     setShowAcceptModal(false);
   };

  return (
    <Form {...form}>
      <HeaderText text={"Appointment"} />
      <Box className="p-2">
        <Box className="mt-7">
          <Box className=" bg-white p-3 mt-3  rounded-[8px]">
            <Box style={{ borderBottomWidth: 1 }} className=" border-[#bbc7d66a]">
              <Text className="block text-[18px] font-[600] text-[#373A36]">
                Mentorship session with <span className="text-primary">Arthur Lee</span>
              </Text>
              <Text className="block text-[14px] font-[300] mt-3 text-[#373A36]">
                Status:{" "}
                <span
                  style={{ borderWidth: 1 }}
                  className="text-[#373A36] font-[400] bg-[#EDFAFD] border-[#8ED4DE] rounded-[32px] px-4 py-1 h-[28px] ms-3"
                >
                  Pending
                </span>
              </Text>
              <Text className="block text-[14px] font-[300] mt-3 text-[#373A36]">
                Date: <span className="text-[#373A36] font-[400] ms-[17px]">07 April 2024</span>
              </Text>
              <Text className="block text-[14px] font-[300] mt-2 mb-3 text-[#373A36]">
                Time: <span className="text-[#373A36] font-[400] ms-[17px]">3:00 pm - 4:00 pm</span>
              </Text>
            </Box>
            <Box>
              <Flex className="gap-[30px] mt-4">
                <Button
                  style={{ borderWidth: 1 }}
                  className="w-full shadow-none bg-transparent font-[400] text-[16px] border-[#BDC7D5] text-[#373A36] rounded-[8px] h-[40px] hover:text-white"
                >
                  Accept
                </Button>
                <Button
                  style={{ borderWidth: 1 }}
                  className="w-full bg-transparent  shadow-none font-[400] text-[16px] border-[#BDC7D5] text-[#373A36] rounded-[8px] h-[40px] hover:text-white"
                >
                  Reject
                </Button>
              </Flex>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputTextArea
                        type="text"
                        className="mt-4 h-[128px]"
                        placeholder="Enter message for student"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Box className="mt-4">
                <Button onClick={handleAcceptClick} className="w-full h-[40px] text-[16px] font-[600]">
                  Accept & Send
                </Button>
                <Button className="w-full h-[40px] text-[16px] font-[600] mt-2 bg-transparent border-primary border-2 text-primary hover:text-white">
                  Postpone Appointment
                </Button>
              </Box>
              <Flex className="mt-2">
                <Image src="/uploads/images/danger.png" width={15} height={10} alt={""} />
                <Text className="text-[13px] font-[300] ms-1 text-[#373A36]">
                  Send message to accept the mentorship request.
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      {showAcceptModal && (
        <Modal onClose={handleAcceptCloseModal}>
          <Box className="p-4 bg-white w-[330px] rounded-[8px]">
            <Text className="block text-[22px] text-center font-[700]">Appointment Accepted</Text>
            <Flex className=" justify-center mt-2">
              <Image src="/uploads/images/right.png" width={80} height={80} alt={""} />
            </Flex>
            <Text className="block text-[16px] mt-4 text-[#373A36] text-center font-[600]">
              07 April 2024 | 3:00 PM- 4:00 PM
            </Text>
            <Text className="block text-[16px] text-[#373A36] text-center font-[300] mt-2 px-4">
              We’ve got you confirmed for your appointment.
            </Text>
            <Box className="p-3 mt-4">
              <Button className="w-full h-[40px] text-[15px] font-[600]" onClick={handleAcceptCloseModal}>
                Add to Calendar
              </Button>
              <Button
                style={{ borderWidth: 2 }}
                className="w-full h-[40px] mt-3 bg-transparent hover:bg-transparent border-[#DA291C] text-[#DA291C] text-[15px] font-[600]"
                onClick={handleAcceptCloseModal}
              >
                View My Appointments
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Form>
  );
};

export default AppointmentAccept;
