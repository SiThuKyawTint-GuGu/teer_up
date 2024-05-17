/* eslint-disable no-unused-vars */
"use client"
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import HeaderText from "../../profile/components/HeaderText";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Image } from "@/components/ui/Images";
import { useRouter } from "next/navigation";
import { TimePicker } from "../components/TimePicker";

const PostponeAppointment = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<Date>();
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [time, setTime] = useState({ hour: 12, minute: 0, second: 0, period: "AM" });
  

   const handleRescheduleClick = () => {
     setShowRescheduleModal(true);
   };

   const handleRescheduleCloseModal = () => {
     setShowRescheduleModal(false);
   };

   const handleNext = (_:undefined) =>{
    router.push("appointments-chat");
   }

   const handleTimeChange = (newTime:any) => {
     setTime(newTime);
   };

  return (
    <>
      <Box style={{ width: "100%" }}>
        <HeaderText text={"Reschedule"} />
        <Box className="p-2" style={{ width: "100%" }}>
          <Box className="mt-4" style={{ width: "100%" }}>
            <Text className="text-[18px] font-[500] text-[#373A36]">
              Reschedule Mentorship session with <span className="text-primary">Arthur Lee</span>
            </Text>
          </Box>
          <Box className="mt-4 bg-white rounded-[8px] w-full p-3 px-0" style={{ width: "100%" }}>
            <Text className="text-[14px] font-[500] text-[#373A36] px-3">Select Date :</Text>
            <DayPicker
              className="bg-[#FAFAFA]"
              mode="single"
              selected={selected}
              onDayClick={day => setSelected(day)}
              style={{ width: "350px" }}
              styles={{
                head_cell: {
                  width: "60px",
                },
                table: {
                  maxWidth: "none",
                },
                day: {
                  margin: "auto",
                },
              }}
            />
          </Box>
          <Box className="mt-4 bg-white rounded-[8px] w-full p-3 px-0" style={{ width: "100%" }}>
            <Text className="text-[14px] font-[500] text-[#373A36] px-3">Select Time :</Text>
            <Box className="mt-4">
              <TimePicker onTimeChange={handleTimeChange} />
            </Box>
          </Box>
          <Box className="mt-4">
            <Button onClick={handleRescheduleClick} className="w-full h-[40px] text-[16px] font-[600]">
              Reschedule
            </Button>
          </Box>
        </Box>
        {showRescheduleModal && (
          <Modal onClose={handleRescheduleCloseModal}>
            <Box className="p-4 bg-white w-[330px] rounded-[8px]">
              <Text className="block text-[22px] text-center font-[700]">Appointment Rescheduled</Text>
              <Flex className=" justify-center mt-2">
                <Image src="/uploads/images/right.png" width={80} height={80} alt={""} />
              </Flex>
              <Text className="block text-[16px] mt-4 text-[#373A36] text-center font-[600]">
                07 April 2024 | 3:00 PM- 4:00 PM
              </Text>
              <Text className="block text-[16px] text-[#373A36] text-center font-[300] mt-2 px-4">
                We’ve got you updated for your appointment.
              </Text>
              <Box className="p-3 mt-4">
                <Button className="w-full h-[40px] text-[15px] font-[600]" onClick={handleRescheduleCloseModal}>
                  Add to Calendar
                </Button>
                <Button
                  style={{ borderWidth: 2 }}
                  className="w-full h-[40px] mt-3 bg-transparent hover:bg-transparent border-[#DA291C] text-[#DA291C] text-[15px] font-[600]"
                  onClick={() => handleNext(undefined)}
                >
                  View My Appointments
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default PostponeAppointment;
