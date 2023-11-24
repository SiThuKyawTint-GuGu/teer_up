"use client";
import { Button } from "@/components/ui/Button";
import { Animate, Dialog, DialogContent } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Image } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useRequestMentorship } from "@/services/content";
import { ContentData } from "@/types/Content";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  message: yup.string().required("Message is reuquired"),
});

type MentorDetailProp = {
  data: ContentData;
  contentMutate?: any;
};
const MentorDetail: React.FC<MentorDetailProp> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { trigger, isMutating } = useRequestMentorship();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (formData: { message: string }) => {
    await trigger({
      message: formData.message,
      content_id: data?.id,
    });
  };

  return (
    <div className="w-full h-[calc(100dvh-96px)]">
      {data && (
        <div className="w-full h-full overflow-y-auto no-scrollbar">
          <Box className="pb-[7]">
            <Box className="pb-[7px]">
              <Section p="0">
                <div
                  style={{
                    background: `url(${data?.mentor?.cover_url}) center / cover`,
                    height: "130px",
                  }}
                />
              </Section>
              <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                <div className="absolute -top-[36%] z-0">
                  {data?.mentor?.profile_url ? (
                    <Flex
                      justify="center"
                      align="center"
                      position="relative"
                      className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
                      style={{
                        background: `url(${data?.mentor?.profile_url}) center / cover`,
                      }}
                    />
                  ) : (
                    <Flex
                      justify="center"
                      align="center"
                      position="relative"
                      className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
                    >
                      <Image
                        className="mt-[30px]"
                        width={90}
                        height={90}
                        src="/uploads/icons/user-profile.svg"
                        alt="user profile"
                      />
                    </Flex>
                  )}
                </div>

                <Heading as="h4" size="5" mb="4">
                  {data?.mentor?.name}
                </Heading>
                <Text>{data?.mentor?.bio}</Text>
              </Section>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  About
                </Heading>
                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">This is about</div>

                <div className="pb-[10px] mb-[10px]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      Email
                    </Text>
                    <Text>{data.mentor.name}</Text>
                  </Flex>
                </div>
              </Section>
            </Box>

            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Experties
                </Heading>

                {data?.mentor?.industries?.length > 0 &&
                  data?.mentor?.industries?.map((each, index) => (
                    <Text
                      key={index}
                      as="span"
                      className="px-2 py-1 rounded-xl text-center text-[14px] bg-secondary border-[1px] border-primary"
                    >
                      {each?.industry?.name}
                    </Text>
                  ))}
              </Section>
            </Box>
          </Box>
          <Box className="pb-[7px]">
            <Section className="bg-white" py="4" px="3">
              <Heading as="h6" size="4" align="left" mb="4">
                Job Experience
              </Heading>
              {data?.mentor?.experiences?.length > 0 &&
                data?.mentor?.experiences?.map((each, key) => (
                  <Flex
                    key={key}
                    justify="between"
                    align="start"
                    className={cn(
                      "pb-[10px] mb-[10px]",
                      key !== (data?.mentor?.experiences ? data?.mentor?.experiences.length - 1 : -1) &&
                        "border-b border-b-[#BDC7D5]"
                    )}
                  >
                    <Flex justify="start" align="start" gap="2">
                      <Image src="/uploads/icons/experience.svg" width={32} height={32} alt="experience" />
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="bold" size="3">
                          {each?.position}
                        </Text>
                        <Text size="2" weight="light">
                          {each?.company || "-"}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex justify="end" align="center" gap="1">
                      <Text size="2" weight="light">
                        {dayjs(each?.start_date).format("MMM, YYYY")}
                      </Text>
                      <Text size="2" weight="light">
                        -
                      </Text>
                      {each?.is_present === true ? (
                        <Text size="2" weight="light">
                          {"Present"}
                        </Text>
                      ) : (
                        <Text size="2" weight="light">
                          {each?.end_date ? dayjs(each?.end_date).format("MMM, YYYY") : "-"}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                ))}
            </Section>
          </Box>
          <Box className="pb-[7px]">
            <Section className="bg-white" py="4" px="3">
              <Heading as="h6" size="4" align="left" mb="4">
                Education
              </Heading>
              {data?.mentor?.education?.length > 0 &&
                data?.mentor?.education?.map((each, key) => (
                  <Flex
                    key={key}
                    justify="between"
                    align="start"
                    className={cn(
                      "pb-[10px] mb-[10px]",
                      key !== (data?.mentor?.education ? data?.mentor?.education.length - 1 : -1) &&
                        "border-b border-b-[#BDC7D5]"
                    )}
                  >
                    <Flex justify="start" align="start" gap="2">
                      <Image src="/uploads/icons/experience.svg" width={32} height={32} alt="experience" />
                      <Flex direction="column" gap="2">
                        <Text as="label" weight="bold" size="3">
                          {each?.degree}
                        </Text>
                        <Text size="2" weight="light">
                          {each?.school_name || "-"}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex justify="end" align="center" gap="1">
                      <Text size="2" weight="light">
                        {dayjs(each?.start_date).format("MMM, YYYY")}
                      </Text>
                      <Text size="2" weight="light">
                        -
                      </Text>
                      {each?.is_present ? (
                        <Text size="2" weight="light">
                          {"Present"}
                        </Text>
                      ) : (
                        <Text size="2" weight="light">
                          {each?.end_date ? dayjs(each?.end_date).format("MMM, YYYY") : "-"}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                ))}
            </Section>
          </Box>
        </div>
      )}
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        <DialogTrigger>
          <div className="fixed w-full max-w-[400px] shadow-inner bottom-0 z-[9] bg-white p-3 ">
            <Button size="sm" className="w-full">
              Send Request
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent
          animate={Animate.SLIDE}
          className={cn(
            " top-[initial] bottom-0 px-0 py-2 translate-y-0 border-0  bg-white shadow-none outline-none rounded-16px-tl-tr"
          )}
        >
          <Flex direction="column" className="bg-white h-full">
            <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mt-[8px]  mx-auto" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="p-4">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputTextArea
                          type="text"
                          placeholder="Include you available time and describe why you want this mentorship"
                          {...field}
                          className="p-3 h-[190px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-[24px]" disabled={isMutating}>
                  Send
                </Button>
              </form>
            </Form>
          </Flex>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorDetail;
