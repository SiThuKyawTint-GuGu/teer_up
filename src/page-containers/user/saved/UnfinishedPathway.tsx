"use client";
import BGImage from "@/components/shared/BGImage";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUnfinishedPathway } from "@/services/content";
import { TRIGGER_TYPE, UnfinishedPathwayResponse } from "@/types/SavedContent";
import { Box, Flex, Grid, Heading, IconButton, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import "@/styles/progressbar.css";
dayjs.extend(relativeTime);

interface UnfinishedPathwayProps {
  setTriggerType: React.Dispatch<React.SetStateAction<TRIGGER_TYPE | undefined>>;
  toggleMenu: (each: any) => void;
  trigger_type: TRIGGER_TYPE;
}

const UnfinishedPathway: React.FC<UnfinishedPathwayProps> = ({ setTriggerType, toggleMenu, trigger_type }) => {
  const router = useRouter();
  const { data: unFinishedPathways } = useGetUnfinishedPathway<UnfinishedPathwayResponse>();

  return (
    <Grid columns="1">
      <Box className="pb-[7px]">
        <Section className="" py="4" px="3">
          {unFinishedPathways?.data?.length ? (
            unFinishedPathways?.data?.map((each, key) => (
              // <Link key={key} href={`/content/${each?.content?.slug}`}>
              <Box pb="4" key={key}>
                <CardBox
                  className="p-[8px] bg-white cursor-pointer overflow-hidden shadow-lg"
                  onClick={() => router.push(`/content/${each?.content?.slug}`)}
                >
                  <Flex justify="start" align="start" gap="2">
                    <BGImage
                      width="128px"
                      height="100px"
                      url={each?.content?.image_url}
                      className="rounded-[4px] mr-2"
                    />
                    <Flex className="text-[#373A36] space-y-1 w-3/4" direction="column" justify="between" wrap="wrap">
                      <Text>{each?.content?.title}</Text>
                      <Text size="2" weight="light">
                        <Text as="span">{each?.progress === 100 ? "Completed" : `${each?.progress}% completed`}</Text>
                        <progress
                          value={each?.progress}
                          max="100"
                          className="
                          w-full h-2  rounded-[4px] overflow-hidden mt-1 "
                        />
                      </Text>
                    </Flex>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setTriggerType(trigger_type);
                      }}
                    >
                      <IconButton
                        className="ml-auto"
                        variant="ghost"
                        onClick={e => {
                          e.stopPropagation();
                          toggleMenu(each);
                        }}
                      >
                        <Icons.moreOption />
                      </IconButton>
                    </DialogTrigger>
                  </Flex>
                </CardBox>
              </Box>
              // </Link>
            ))
          ) : (
            <>
              <NotFound
                icon={<Image src="/uploads/icons/saved-icon.svg" width={80} height={80} alt="saved" />}
                content={
                  <>
                    <Text>There’s no items unfinished pathways.</Text>
                  </>
                }
                link={
                  <Link href="/home">
                    <Button>Browse now</Button>
                  </Link>
                }
              />
            </>
          )}
        </Section>
      </Box>
    </Grid>
  );
};

export default UnfinishedPathway;
