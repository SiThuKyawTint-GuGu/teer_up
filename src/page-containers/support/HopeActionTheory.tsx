"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserDimensionResult } from "@/services/dimension";
import { UserDimensionResultResponse } from "@/types/Dimension";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const HopeActionTheory: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { data: userDimensionData } = useGetUserDimensionResult<UserDimensionResultResponse>();

  console.log(userDimensionData);

  return (
    <Grid columns="1">
      <Box>
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <Button onClick={() => startTransition(() => router.back())} variant="ghost" className="p-0 h-auto">
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </Button>

              <Text size="3" weight="medium">
                Hope Action Theory
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Heading mb="6">Hope Action Theory</Heading>
          <Box className="space-y-10">
            <Box className="space-y-4">
              <Text className="text-sm">
                &#34;Hope-Action-Theory&#34; is an emerging theory in the fields of career development and organization
                development with promising evidence of its effectiveness for one&#39;s career development with various
                populations, such as unemployed adults, refugees, college students, and internationals.
              </Text>
              <Text className="text-sm">
                It considers each human system as an agent that interacts with the environment and describes a mechanism
                to stay hopeful with the following hope-action competencies: hope, self-reflection, self-clarity,
                visioning, goal setting and planning, implementing, and adapting.
              </Text>
            </Box>
            <Box>
              {userDimensionData?.data?.map((each, key) => (
                <Flex key={key} direction="column" justify="start" className="mb-4">
                  <Text weight="bold">{each.short_name}: </Text>
                  <Text>{each.name}</Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default HopeActionTheory;
