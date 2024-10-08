"use client";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Image } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useGetContentBySlug, useRequestMentorship } from "@/services/content";
import { ContentData } from "@/types/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  message: yup.string().required("Message is reuquired"),
});
const MentorProfile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { slug }: { slug: string } = useParams();
  const { data } = useGetContentBySlug<ContentData>(slug);

  const { trigger, isMutating } = useRequestMentorship();
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (formData: { message: string }) => {
    await trigger({
      message: formData.message,
      content_id: data?.data.id,
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={val => setOpen(val)}>
        {data && (
          <Grid columns="1">
            <Box className="pb-[55px]">
              <Box className="pb-[7px]">
                <Section p="0">
                  <div
                    style={{
                      background: `url(${data?.data?.mentor?.cover_url}) center / cover`,
                      height: "130px",
                    }}
                  />
                </Section>
                <Section className="bg-white pt-[70px]" pb="4" px="3" position="relative">
                  <div className="absolute -top-[36%]">
                    {data.data.profile_url ? (
                      <Flex
                        justify="center"
                        align="center"
                        position="relative"
                        className="w-[120px] h-[120px] rounded-full bg-[#D9D9D9] ring-4 ring-white"
                        style={{
                          background: `url(${data.data.mentor.profile_url}) center / cover`,
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
                    {}
                  </Heading>
                  <Text>{data?.data?.mentor.bio}</Text>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Personal information
                  </Heading>
                  <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="bold" size="3">
                        Gender
                      </Text>
                      <Text>Male</Text>
                    </Flex>
                  </div>
                  <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="bold" size="3">
                        Birthday
                      </Text>
                      <Text>24th December 2002</Text>
                    </Flex>
                  </div>
                  <div className="pb-[10px] mb-[10px]">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="bold" size="3">
                        Email
                      </Text>
                      <Text>{data.data.name}</Text>
                    </Flex>
                  </div>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Experties
                  </Heading>
                  <span className="px-2 py-1 rounded-xl text-center text-[14px] bg-secondary border-[1px] border-primary">
                    Programming
                  </span>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Career interests
                  </Heading>
                  <Flex wrap="wrap" gap="2">
                    Industry
                  </Flex>
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Experience
                  </Heading>
                  <Flex wrap="wrap" gap="2">
                    Frontend Developer
                  </Flex>
                </Section>
              </Box>
            </Box>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" align="left" mb="4">
                  Education
                </Heading>

                <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <Flex direction="column" gap="2">
                    <Text as="label" weight="bold" size="3">
                      National Management Degree Collegue
                    </Text>
                    <Text>BA</Text>
                  </Flex>
                </div>
              </Section>
            </Box>
          </Grid>
        )}
        <DialogTrigger>
          <div className="fixed w-full max-w-[400px] shadow-inner bottom-0  z-[9999] p-3 bg-white">
            <Button size="sm" className="w-full">
              Send Request
            </Button>
          </div>
        </DialogTrigger>
        {open && (
          <DialogContent className="bg-white top-[initial] h-auto bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
            <Flex gap="3" direction="column" className="bg-white h-full">
              <div className="bg-primary rounded-[6px] w-[60px] h-[2px] my-3 mx-auto"></div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
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
                            className="p-3"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full my-5" disabled={isMutating}>
                    Send
                  </Button>
                </form>
              </Form>
            </Flex>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default MentorProfile;
