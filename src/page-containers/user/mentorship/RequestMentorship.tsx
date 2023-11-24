"use client";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons, Image } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useApproveMentorship, useGetMentorship } from "@/services/mentorship";
import { REQUEST_TYPES, USER_ROLE } from "@/shared/enums";
import { Mentorship, MentorshipResponse } from "@/types/Mentorship";
import { User } from "@/types/User";
import { getUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TriggerWithArgs } from "swr/mutation";
import * as yup from "yup";
const validationSchema = yup.object({
  reply: yup.string(),
  status: yup.string(),
});
type RequestFormData = { reply?: string; id: number };
const RequestMentorship: React.FC = () => {
  const { data: requestMentorship, mutate } = useGetMentorship<ParamsType, MentorshipResponse>();
  const { trigger: approvedTrigger } = useApproveMentorship();
  const role = useMemo(() => {
    const userInfo = getUserInfo() as User;
    return userInfo?.role;
  }, []);
  const getStatus = useCallback((status: string) => {
    switch (status) {
      case REQUEST_TYPES.ACCEPTED:
        return (
          <Text className="px-4 py-1 border-2 border-[#AADF9F] text-[14px] bg-[#E4F5E1] text-black rounded-full">
            Accepted
          </Text>
        );
      case REQUEST_TYPES.CONFIRMED:
        return (
          <Text className="px-[16px] py-[4px] border-2 border-[#A793DD] text-[14px] bg-[#EFEAFC] text-black rounded-full">
            Confirmed
          </Text>
        );
      case REQUEST_TYPES.PENDING:
        return (
          <Text className="px-4 py-1 border-2 border-[#8ED4DE] text-[14px] bg-[#EDFAFD] text-black rounded-full">
            Pending
          </Text>
        );
      case REQUEST_TYPES.DENIED:
        return (
          <Text className="px-4 py-1 border-2 border-[#EAA1A6] text-[14px] bg-[#F9E9EB] text-black rounded-full">
            Denied
          </Text>
        );

      default:
        return null;
    }
  }, []);

  const handleApprovedRequest = useCallback(
    async (status: REQUEST_TYPES, id: number, reply?: string) => {
      await approvedTrigger({
        status,
        id,
        reply,
      });
      await mutate();
    },
    [approvedTrigger]
  );

  return (
    <Grid>
      <Box>
        <Section p="0" mx="3" my="6" className="">
          {requestMentorship?.data?.length ? (
            requestMentorship?.data?.map((each, key) => (
              <CardBox key={key} p="4" className="space-y-[16px] bg-white" mb="4">
                <Heading as="h4" size="4">
                  Mentorship session with{" "}
                  <Text as="span" className="text-primary">
                    {role === USER_ROLE.STUDENT ? each?.mentor?.name : each?.student?.name}
                  </Text>
                </Heading>
                <div>
                  <div className="space-y-3">
                    <Flex justify="start" align="center">
                      <Text className="w-1/4 font-light">Status:</Text>
                      {getStatus(each?.status)}
                    </Flex>
                    {each?.student_reply && (
                      <Flex justify="start" align="start">
                        <Text className="w-1/4 font-light">Student:</Text>
                        <Text className="w-3/4 text-[14px]">{each?.student_reply}</Text>
                      </Flex>
                    )}
                    {each?.mentor_reply && (
                      <Flex justify="start" align="start">
                        <Text className="w-1/4 font-light">Mentor:</Text>
                        <Text className="w-3/4 text-[14px]">{each?.mentor_reply}</Text>
                      </Flex>
                    )}
                    {role === USER_ROLE.STUDENT && each?.status === REQUEST_TYPES.ACCEPTED && (
                      <Flex justify="start" align="center">
                        <Button
                          onClick={() => handleApprovedRequest(REQUEST_TYPES.CONFIRMED, each?.id)}
                          className="bg-primary w-full  text-[14px] "
                        >
                          Confirm
                        </Button>
                      </Flex>
                    )}
                    {each?.status === REQUEST_TYPES.PENDING && role === USER_ROLE.MENTOR && (
                      <RequestMentorshipForm
                        approvedTrigger={approvedTrigger}
                        data={each}
                        handleApprovedRequest={handleApprovedRequest}
                      />
                    )}
                  </div>
                </div>
              </CardBox>
            ))
          ) : (
            <NotFound
              icon={<Image src="/uploads/icons/saved-icon.svg" width={80} height={80} alt="saved" />}
              content={
                <>
                  <Text>There’s no requests.</Text>
                </>
              }
            />
          )}
        </Section>
      </Box>
    </Grid>
  );
};

type RequestMentorshipFormParam = {
  approvedTrigger: TriggerWithArgs<
    AxiosResponse<
      {
        arg: {
          status: REQUEST_TYPES;
          id: number;
          reply?: string | undefined;
        };
      },
      any
    >,
    any,
    "/mentorships",
    {
      status: REQUEST_TYPES;
      id: number;
      reply?: string | undefined;
    }
  >;
  data: Mentorship;
  handleApprovedRequest: (status: REQUEST_TYPES, id: number, reply?: string) => Promise<void>;
};

const RequestMentorshipForm: React.FC<RequestMentorshipFormParam> = ({
  approvedTrigger,
  data,
  handleApprovedRequest,
}) => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const submit = async (formData: RequestFormData) => {
    await approvedTrigger({
      status: REQUEST_TYPES.ACCEPTED,
      id: formData.id,
      reply: formData.reply || "",
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData: { reply?: string }) =>
            submit({
              reply: formData.reply,
              id: data?.id,
            })
          )}
        >
          <div className="py-[16px]  border-t border-t-[#BDC7D5]">
            <FormField
              control={form?.control}
              name="reply"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputTextArea
                      inputType="text"
                      placeholder="Enter message for student"
                      {...field}
                      className="p-3 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <InputTextArea
            inputType={USER_ROLE.ADMIN}
            value={reply}
            className="text-sm h-[130px]"
            placeholder="Enter message for student"
          /> */}
          </div>
          <Flex justify="start" align="center" mb="2" gap="2">
            <Button type="submit" className="bg-primary w-full">
              Accept & Send
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleApprovedRequest(REQUEST_TYPES.DENIED, data?.id, form.getValues("reply"))}
              className="  w-full"
            >
              Denie
            </Button>
          </Flex>
          <Flex align="start" gap="1">
            <Icons.inputError className="w-[20px] h-[20px]" />
            <Text weight="light" size="2">
              Send message to accept the mentorship request.
            </Text>
          </Flex>
        </form>
      </Form>
    </>
  );
};

export default RequestMentorship;
