"use client";

import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Flex, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface MentorCoverImageProps {
  imageUrl: string;
  onBackClick: () => void;
  onLoveClick: () => void;
}

const MentorCoverImage: React.FC<MentorCoverImageProps> = ({ imageUrl, onBackClick, onLoveClick }) => {
  const [reaction, setReaction] = useState(false);

  return (
    <div className="relative w-full h-full">
      <img src={imageUrl} alt="Image" className="object-cover w-full h-full" />
      <div className="absolute top-0 left-0 flex space-x-4 w-full justify-between py-7 px-5">
        <button
          type="button"
          className="flex items-center flex-wrap gap-x-[10px] bg-[#17161621] h-12 w-12 justify-center rounded-[50%]"
          onClick={onBackClick}
        >
          <Icons.back className="w-[22px] h-[22px] text-white" />
        </button>
        <button
          className="flex items-center flex-wrap gap-x-[10px] bg-[#17161621] h-12 w-12 justify-center rounded-[50%]"
          onClick={() => {
            setReaction(!reaction);
            onLoveClick();
          }}
        >
          {!reaction ? (
            <Icons.like className="w-[22px] h-[22px] text-white font-[600]" />
          ) : (
            <Icons.likeFill className="w-[22px] h-[22px] text-white font-[600]" />
          )}
        </button>
      </div>
    </div>
  );
};

const ExperienceBox: React.FC = () => {
  const mentorExperiences = [
    {
      position: "Product designer",
      company: "viabells",
      start_date: "31/1/1998",
      is_present: true,
      end_date: "20/3/2000",
    },
  ];

  return (
    <CardBox className="rounded-md">
      <Section className="bg-white" py="4" px="3">
        <Flex justify={"between"} align={"baseline"} mb="4">
          <Heading as="h6" size="4" align="left">
            Experience
          </Heading>
          <Text className="ml-auto">
            <Button variant="link" className="text-primary font-bold">
              <p className="text-primary text-[16px] font-[600]">See all</p>
            </Button>
          </Text>
        </Flex>
        {mentorExperiences?.map((each, key) => (
          <Flex key={key} justify="between" align="start" className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="start" align="start" gap="2">
              <Image src="/uploads/icons/experience.svg" width={32} height={32} alt="experience" />
              <Flex direction="column" gap="2">
                <Text as="label" weight="bold" size="3">
                  {each?.position}
                </Text>
                <Text size="2" weight="light">
                  {each?.company}
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
    </CardBox>
  );
};

const EducationBox: React.FC = () => {
  const mentorEducations = [
    {
      degree: "Bachelor of designer",
      school_name: "ISO University",
    },
  ];

  return (
    <CardBox className="rounded-md">
      <Section className="bg-white" py="4" px="3">
        <Flex justify={"between"} align={"baseline"} mb="4">
          <Heading as="h6" size="4" align="left">
            Education
          </Heading>
        </Flex>
        {mentorEducations?.map((each, key) => (
          <Flex key={key} justify="between" align="start" className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="start" align="start" gap="2">
              <Image src="/uploads/icons/education.svg" width={32} height={32} alt="education" />
              <Flex direction="column" gap="2">
                <Text as="label" weight="bold" size="3">
                  {each?.degree}
                </Text>
                <Text size="2" weight="light">
                  {each?.school_name}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Section>
    </CardBox>
  );
};

const MentorDetail = () => {
  const router = useRouter();
  return (
    <Flex direction="column" className="bg-[##F8F9FB]" gap="3">
      <MentorCoverImage
        imageUrl="https://s3-alpha-sig.figma.com/img/054c/2ec4/0234423d41b07730377434c366fdd6a3?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=klW6zuYBO6Bahnt6yPYRtGhouLzhBZdrIDHNO-zO37ZoaO9d5dG2WogCSQGvo-NqkMaYIq~iT0shEFB8p3oDfMXVWlj49haiFVxcICGIRNmPeA4KsxNXk2iVXiThXd9klaUOBuS~E0dajFQmJQrFHDEuxUzugWaetGtCgW68o485UR9GNj6MR9gfWe8DKrsp--DDaaOrW9TWJDVJL8pG6GrpIWuMUhbmRDzbQbvZDzwZ7YBjaat-dbibW6EialmfUS-nIFBT5h3VSSonN4DEO7M24JfD~O7XZSHa60gEHH~EYoYkXmScqO-NbhwWj9TeNcESPvLR8pdS9jGMuEXyMA__"
        onBackClick={() => router.back()}
        onLoveClick={() => {}}
      />
      <Section className="grid place-content-center p-4">
        <Flex direction="row" align="center" gap="2">
          <Text as="div" className="text-[20px] font-[600]">
            Omowumi John
          </Text>
          <Icons.verifiedIcon />
        </Flex>
      </Section>
      <CardBox className="w-full bg-white rounded-lg p-4 space-y-4">
        <Heading as="h6" size="4" align="left">
          About
        </Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ipsam! Ipsum eos maiores sed vel tempora
          molestiae nulla porro tempore inventore dolores perspiciatis, illum, atque eum eligendi dolore, necessitatibus
          blanditiis!
        </p>
      </CardBox>
      <CardBox className="w-full bg-white rounded-lg p-4 space-y-4">
        <Heading as="h6" size="4" align="left">
          Expertise
        </Heading>
        <Flex wrap="wrap" gap="2">
          {["Quick Prototyping", "Design Thinking", "Interaction Design", "Research & usability testing"].map(
            (each: string, key: number) => (
              <>
                <Button key={key} className="border border-[#EAA1A6] bg-[#F9E9EB] text-black hover:bg-[#F9E9EB]">
                  {each}
                </Button>
              </>
            )
          )}
        </Flex>
      </CardBox>
      <ExperienceBox />
      <EducationBox />
      <Button onClick={() => {}} className="w-full mb-4">
        Request Connection
      </Button>
    </Flex>
  );
};

export default MentorDetail;
