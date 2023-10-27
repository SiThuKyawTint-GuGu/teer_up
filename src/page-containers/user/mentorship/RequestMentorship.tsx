"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Icons } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { USER_ROLE } from "@/shared/enums";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";

const RequestMentorship = () => {
  return (
    <Grid>
      <Box>
        <Section p="0" mx="3" my="6">
          <CardBox p="4" className="space-y-[16px] bg-white">
            <Heading as="h4" size="4">
              Mentorship session with{" "}
              <Text as="span" className="text-primary">
                James Smith
              </Text>
            </Heading>
            <div>
              <Flex justify="start" align="center">
                <Text className="w-1/4 font-light">Status:</Text>
                <Text className="px-4 py-1 border-2 border-[#AADF9F] bg-[#E4F5E1] text-black rounded-full">
                  Accepted
                </Text>
              </Flex>
              <Flex justify="start" align="center">
                <Text className="w-1/4 font-light">Student:</Text>
                <Text className="w-3/4">
                  Lorem ipsum do amet ipsum mattis ipsum dolor sit am Lorem ipsum do amet ipsum{" "}
                </Text>
              </Flex>
              <Flex justify="start" align="center">
                <Text className="w-1/4 font-light">Mentor:</Text>
                <Text className="w-3/4">
                  Lorem ipsum do amet ipsum mattis ipsum dolor sit am Lorem ipsum do amet ipsum{" "}
                </Text>
              </Flex>
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
            </div>
            <Flex justify="start" align="center">
              <Button className="bg-primary w-full">Confirm</Button>
            </Flex>
          </CardBox>
        </Section>
      </Box>
    </Grid>
  );
};

export default RequestMentorship;
