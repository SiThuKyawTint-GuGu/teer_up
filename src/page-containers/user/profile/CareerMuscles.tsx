import CardBox from "@/components/ui/Card";
import { Icons } from "@/components/ui/Images";
import { Button } from "@/components/ui/Button";
import { UserDimensionResultResponse } from "@/types/Dimension";
import { UserOnboardingStatusResponse } from "@/types/User";
import { Section, Heading, Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import RadarChart from "./RadarChart";

interface CareerMusclesProps {
  userDimensionData: UserDimensionResultResponse;
  statusLoading: boolean;
  getOnboardingStatus: UserOnboardingStatusResponse;
  scoresLoading: boolean;
  handleContinueAssessment: () => void;
  handleRetakeAssessment: () => void;
}

function CareerMuscles({
  userDimensionData,
  statusLoading,
  getOnboardingStatus,
  scoresLoading,
  handleContinueAssessment,
  handleRetakeAssessment,
}: CareerMusclesProps) {
  return (
    <>
      <CardBox className="rounded-md">
        <Section className="bg-white" py="4" px="3">
          <Heading as="h6" size="4" align="left" mb="4">
            Your Career Muscles{" "}
            <span className="text-md font-normal">are competencies that you need to navigate the world of jobs</span>
          </Heading>
          <Box className="w-full h-full flex-wrap">
            <RadarChart />
            <Button
              onClick={handleContinueAssessment}
              loading={statusLoading}
              disabled={getOnboardingStatus?.data?.completed}
              className="w-full"
            >
              Continue Questionnaire
            </Button>
            <Button onClick={handleRetakeAssessment} loading={scoresLoading} variant="link" className="w-full">
              Retake Questionnaire
            </Button>
          </Box>
        </Section>
      </CardBox>

      <CardBox className="rounded-none">
        <Section className="" py="4" px="3">
          <Heading as="h6" size="4" align="left" mb="4">
            Here&#39;s what we noticed about you
          </Heading>
          {userDimensionData?.data?.length && (
            <>
              {userDimensionData?.data?.map((each, key) => {
                return (
                  <Box key={key} position="relative" className="bg-white rounded-[8px] space-y-4" mb="4" p="3">
                    <Flex justify="start" align="start" gap="2">
                      <div className="w-[12px] h-[12px] mt-[5px] rounded-sm bg-primary" />
                      <Flex className="w-[calc(100%-12px)] relative" direction="column" align="start">
                        <Flex justify="start" align="center" gap="2">
                          <Text size="3" weight="bold">
                            {each.short_name}
                          </Text>
                          <div className="group inline-block duration-300">
                            <Icons.info />
                            <div className="absolute -left-4 top-6 hidden group-hover:flex px-2 py-1 bg-gray-700 rounded-lg text-white text-sm">
                              {each.name}
                            </div>
                          </div>
                        </Flex>
                        <Text className="whitespace-break-spaces">{each.skill_body}</Text>
                      </Flex>
                    </Flex>
                    {each?.content?.id && (
                      <Flex width="100%">
                        <Link className="w-full" href={`/content/${each?.content?.slug}`}>
                          <Button className="w-full">I&#39;m ready to dive in and explore</Button>
                        </Link>
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </>
          )}
        </Section>
      </CardBox>
    </>
  );
}

export default CareerMuscles;
