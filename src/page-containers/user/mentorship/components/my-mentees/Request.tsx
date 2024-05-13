/* eslint-disable react/jsx-key */
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";

const Request = () => {

    const [showIgnoreModal, setShowIgnoreModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);


    const handleIgnoreClick = () => {
      setShowIgnoreModal(true); 
    };

    const handleIgnoreCloseModal = () => {
      setShowIgnoreModal(false);
    };

     const handleApproveClick = () => {
       setShowApproveModal(true);
     };

     const handleApproveCloseModal = () => {
       setShowApproveModal(false);
     };
  const mentorData = [
    {
      id: 1,
      name: "Omowumi John",
      status: "pending",
      title: "Designer Expect",
    },
    {
      id: 2,
      name: "Omowumi John",
      status: "pending",
      title: "Designer Expect",
    },
    {
      id: 3,
      name: "Omowumi John",
      status: "pending",
      title: "Designer Expect",
    },
    {
      id: 4,
      name: "Omowumi John",
      status: "pending",
      title: "Designer Expect",
    },
  ];
  return (
    <>
      <Box className="mt-5">
        <Box>
          {mentorData &&
            mentorData.map((item, index) => (
              <Box className=" bg-white p-3 mt-3 rounded-[8px]">
                <Flex key={index} className=" justify-between">
                  <Box className="flex">
                    <Box className=" relative">
                      <Image src="/uploads/images/mush.png" className="rounded-[50%]" width={56} height={56} alt={""} />
                      <div className="w-[12px] h-[12px] bg-[#34A853] rounded-[50%] absolute bottom-0 right-1"></div>
                    </Box>
                    <Box className="ms-2 mt-1">
                      <Text className="block text-[16px] font-[600] text-[#373A36] mb-0">{item?.name}</Text>
                      <Text className="text-[12px] font-[400] text-[#373A36]">{item?.title}</Text>
                    </Box>
                  </Box>
                  <Box className="ms-2">
                    <Text className={`text-[12px] font-[600] ${item?.status === "pending" && "text-[#FBBC05]"}`}>
                      {item?.status}
                    </Text>
                  </Box>
                </Flex>
                <Flex className="mt-3 gap-3">
                  <Button
                    onClick={handleIgnoreClick}
                    style={{ borderWidth: 1 }}
                    className="text-[16px] font-[500] h-[35px] w-full bg-transparent border-[#D8D8D8] text-[#00000053] hover:bg-transparent shadow-none"
                  >
                    Ignore
                  </Button>
                  <Button 
                  onClick={handleApproveClick}
                  className="text-[16px] font-[500] h-[35px] w-full">Accept</Button>
                </Flex>
              </Box>
            ))}
          {showIgnoreModal && (
            <Modal onClose={handleIgnoreCloseModal}>
              <Box className="p-4 bg-white w-[330px] rounded-[8px]">
                <Text className="block text-[22px] text-center font-[700]">Ignore this person.</Text>
                <Text className="block text-[16px] text-[#373A36] text-center font-[300] mt-3">
                  Are you sure you want to ignore current and future connection requests for this person.
                </Text>
                <Flex className="gap-3 p-3 mt-4">
                  <Button
                    style={{ borderWidth: 2 }}
                    className="w-full h-[35px] bg-transparent hover:bg-transparent border-[#DA291C] text-[#DA291C] text-[16px] font-[600]"
                    onClick={handleIgnoreCloseModal}
                  >
                    No
                  </Button>
                  <Button className="w-full h-[35px] text-[16px] font-[600]" onClick={handleIgnoreCloseModal}>
                    Yes
                  </Button>
                </Flex>
              </Box>
            </Modal>
          )}
          {showApproveModal && (
            <Modal onClose={handleApproveCloseModal}>
              <Box className="p-4 bg-white w-[330px] rounded-[8px]">
                <Text className="block text-[22px] text-center font-[700]">Confirm Approval</Text>
                <Text className="block text-[16px] text-[#373A36] text-center font-[300] mt-3">
                  Are you sure you wish to accept this request.
                </Text>
                <Flex className="gap-3 p-3 mt-4">
                  <Button
                    style={{ borderWidth: 2 }}
                    className="w-full h-[35px] bg-transparent hover:bg-transparent border-[#DA291C] text-[#DA291C] text-[16px] font-[600]"
                    onClick={handleApproveCloseModal}
                  >
                    No
                  </Button>
                  <Button className="w-full h-[35px] text-[16px] font-[600]" onClick={handleApproveCloseModal}>
                    Yes
                  </Button>
                </Flex>
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Request;
