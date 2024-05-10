/* eslint-disable react/jsx-key */
"use client";
import CardBox from "@/components/ui/Card";
import { Section, Heading, Flex, Text, Box } from "@radix-ui/themes";
import { Button } from "@/components/ui/Button";
import HeaderText from "../profile/components/HeaderText";

function ApplicationStatus() {
 
   return (
     <>
       <HeaderText text={"Application Status"} />
       <div className="flex flex-col justify-center items-center h-screen">
         <CardBox className="rounded-md">
           <Section
             className="flex justify-center align-middle border-b border-b-[#BDC7D5] pb-[25px] mb-[12px]"
             py="4"
             px="3"
           >
             <Text>Your application has been submitted.</Text>
           </Section>
           <Flex className="justify-center mt-10">
             <Button className="h-[40px] font-[600] text-[18px] px-[35px]">OK</Button>
           </Flex>
         </CardBox>
       </div>
     </>
   );
}

export default ApplicationStatus;
