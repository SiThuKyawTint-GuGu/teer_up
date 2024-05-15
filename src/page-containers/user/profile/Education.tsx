"use client";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { EducationParamsType, useGetUserEducations } from "@/services/education";
import { EducationResponse } from "@/types/Education";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const Education: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: educationList } = useGetUserEducations<EducationParamsType, EducationResponse>();

  return (
    <>
      <Grid columns="1">
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="" p="3">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <Text size="3" weight="medium">
                Education
              </Text>
              <Link href={`/profile/${id}/education/create`}>
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>

        <Box className="pb-[7px]">
          <Section className="" py="4" px="3">
            {educationList?.data?.map((each, key) => (
              <div
                key={key}
                className={cn(
                  "pb-[10px] mb-[10px]",
                  key !== (educationList?.data ? educationList?.data.length - 1 : -1) && "border-line"
                )}
              >
                <Flex justify="between" align="start">
                  <Flex direction="column" gap="1">
                    <Text as="label" weight="bold" size="3">
                      {each.school_name}
                    </Text>
                    <Text>{each.degree}</Text>
                  </Flex>
                  <Link href={`/profile/${id}/education/${each.id}`}>
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

export default Education;
