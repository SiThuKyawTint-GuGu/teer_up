"use client";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

const SuccessFormPage = () => {
  const router = useRouter();
  return (
    <Box className="bg-[#F8F9FB]">
      <Box className="h-[100vh] flex justify-center items-center text-center flex-col px-5">
        <Image src={"/content/success.png"} width={98} height={98} alt="success.png" />
        <Text style={{ fontSize: "28px", fontWeight: "bold", color: "#373A36" }}>Thank you for joining the event</Text>
        <Text style={{ fontSize: "16px", fontWeight: "300", color: "#373A36" }} className="">
          The event form is submitted successfully. We will contact you via email.
        </Text>
      </Box>
      <Button loading={false} className="w-full mx-5 mb-10" onClick={() => router.back()}>
        Back to home
      </Button>
    </Box>
  );
};

export default SuccessFormPage;
