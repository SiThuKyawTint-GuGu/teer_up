"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Icons } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useApproveMentorship, useGetMentorship } from "@/services/mentorship";
import { REQUEST_TYPES, USER_ROLE } from "@/shared/enums";
import { MentorshipResponse } from "@/types/Mentorship";
import { User } from "@/types/User";
import { getUserInfo } from "@/utils/auth";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import React, { useCallback, useMemo } from "react";

const RequestMentorship: React.FC = () => {
  const { data: requestMentorship } = useGetMentorship<ParamsType, MentorshipResponse>();
  const { trigger: approvedTrigger } = useApproveMentorship();
  const role = useMemo(() => {
    const userInfo = getUserInfo() as User;
    return userInfo?.role;
  }, []);

  const getStatus = useCallback((status: string) => {
    switch (status) {
      case REQUEST_TYPES.ACCEPTED:
        return (
          <Text className="px-4 py-1 border-2 border-[#AADF9F] bg-[#E4F5E1] text-black rounded-full">Accepted</Text>
        );
      case REQUEST_TYPES.CONFIRMED:
        return (
          <Text className="px-4 py-1 border-2 border-[#A793DD] bg-[#EFEAFC] text-black rounded-full">Confirmed</Text>
        );
      case REQUEST_TYPES.PENDING:
        return (
          <Text className="px-4 py-1 border-2 border-[#8ED4DE] bg-[#EDFAFD] text-black rounded-full">Pending</Text>
        );
      case REQUEST_TYPES.DENIED:
        return <Text className="px-4 py-1 border-2 border-[#EAA1A6] bg-[#F9E9EB] text-black rounded-full">Denied</Text>;

      default:
        return null;
    }
  }, []);

  const handleApprovedRequest = useCallback(
    async (status: REQUEST_TYPES) => {
      await approvedTrigger({
        status,
      });
    },
    [approvedTrigger]
  );

  return (
    <Grid>
      <Box>
        <Section p="0" mx="3" my="6">
          {requestMentorship?.data?.map((each, key) => (
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
                      <Text className="w-3/4">{each?.student_reply}</Text>
                    </Flex>
                  )}
                  {each?.mentor_reply && (
                    <Flex justify="start" align="start">
                      <Text className="w-1/4 font-light">Mentor:</Text>
                      <Text className="w-3/4">{each?.mentor_reply}</Text>
                    </Flex>
                  )}
                  {role === USER_ROLE.STUDENT && each?.status === REQUEST_TYPES.ACCEPTED && (
                    <Flex justify="start" align="center">
                      <Button
                        onClick={() => handleApprovedRequest(REQUEST_TYPES.CONFIRMED)}
                        className="bg-primary w-full"
                      >
                        Confirm
                      </Button>
                    </Flex>
                  )}
                  {each?.status === REQUEST_TYPES.PENDING && role === USER_ROLE.MENTOR && (
                    <>
                      <div className="pt-[20px] mt-[20px] border-t border-t-[#BDC7D5]">
                        <Flex justify="start" align="center" direction="column" gap="2">
                          <InputTextArea
                            inputType={USER_ROLE.ADMIN}
                            className="text-sm h-[130px]"
                            placeholder="Enter message for student"
                          />
                          <Flex align="start" gap="1">
                            <Icons.inputError className="w-[20px] h-[20px]" />
                            <Text weight="light" size="2">
                              Send message to accept the mentorship request.
                            </Text>
                          </Flex>
                        </Flex>
                      </div>
                      <Flex justify="start" align="center">
                        <Button
                          onClick={() => handleApprovedRequest(REQUEST_TYPES.ACCEPTED)}
                          className="bg-primary w-full"
                        >
                          Accept & Send
                        </Button>
                      </Flex>
                    </>
                  )}
                </div>
              </div>
            </CardBox>
          ))}
        </Section>
      </Box>
    </Grid>
  );
};

export default RequestMentorship;
