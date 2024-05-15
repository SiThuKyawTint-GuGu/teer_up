"use client";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { ExperienceParamsType, useGetUserExperiences } from "@/services/experience";
import { ExperienceResponse } from "@/types/Experience";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const Experience: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: experiences } = useGetUserExperiences<ExperienceParamsType, ExperienceResponse>();

  return (
    <>
      <Grid columns="1">
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <Text size="3" weight="medium">
                Job Experience
              </Text>
              <Link href={`/profile/${id}/experience/create`}>
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>

        <Box className="pb-[7px] mt-5">
          <Section className="" py="4" px="3">
            {experiences?.data?.map((each, key) => (
              <div
                key={key}
                className={cn(
                  "pb-[10px] mb-[10px]",
                  key !== (experiences?.data ? experiences?.data.length - 1 : -1) && "border-line"
                )}
              >
                <Flex justify="between" align="start">
                  <Flex direction="column" gap="1">
                    <Text as="label" weight="bold" size="3">
                      {each.position}
                    </Text>
                    <Text size="2">{each.company}</Text>
                  </Flex>
                  <Link href={`/profile/${id}/experience/${each.id}`}>
                    <Image src="/uploads/icons/pencil.svg" width={20} height={20} alt="pencil" />
                  </Link>
                </Flex>
              </div>
            ))}
          </Section>
        </Box>
      </Grid>
    </>
  );
};

export default Experience;
