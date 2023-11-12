"use client";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { SAVED_CONTENT_TYPES, useGetUnfinishedPathway } from "@/services/content";
import { UnfinishedPathwayResponse } from "@/types/SavedContent";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
dayjs.extend(relativeTime);

const filterNames = [
  {
    key: SAVED_CONTENT_TYPES.ALL,
    value: "All content types",
  },
  {
    key: SAVED_CONTENT_TYPES.ARTICLE,
    value: "Article",
  },
  {
    key: SAVED_CONTENT_TYPES.EVENT,
    value: "Event",
  },
  {
    key: SAVED_CONTENT_TYPES.MENTOR,
    value: "Mentor",
  },
  {
    key: SAVED_CONTENT_TYPES.OPPORTUNITY,
    value: "Opportunity",
  },
  {
    key: SAVED_CONTENT_TYPES.PATHWAY,
    value: "Pathway",
  },
  {
    key: SAVED_CONTENT_TYPES.VIDEO,
    value: "Video",
  },
];

enum TRIGGER_TYPE {
  FILTER = "FILTER",
  UNFINISHED = "UNFINISHED",
}

const UnfinishedPathway: React.FC = () => {
  const { data: unFinishedPathways } = useGetUnfinishedPathway<UnfinishedPathwayResponse>();

  return (
    <Grid columns="1">
      <Box>
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Heading as="h6" size="4" align="left">
            Unfinished Pathway
          </Heading>
        </Flex>
        <Box className="pb-[7px]">
          <Section className="" py="4" px="3">
            {unFinishedPathways?.data?.length ? (
              unFinishedPathways?.data?.map((each, key) => (
                <Box key={key} pb="4">
                  {/* <CardBox className="p-[8px]">
                    <Flex justify="start" align="start" gap="2">
                      <BGImage width="128px" height="100px" url={each?.content?.image_url} />
                      <Flex className="text-[#373A36] space-y-1 w-3/4" direction="column" wrap="wrap">
                        <Text>{each?.}</Text>
                        <Text size="2" weight="light">
                          <Text as="span" className="capitalize">
                            {each?.content?.type}
                          </Text>{" "}
                          . Saved {dayjs(each?.created_at).fromNow()}
                        </Text>
                      </Flex>
                    </Flex>
                  </CardBox> */}
                </Box>
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
                    <Link href="/browse">
                      <Button>Browse now</Button>
                    </Link>
                  }
                />
              </>
            )}
          </Section>
        </Box>
      </Box>
    </Grid>
  );
};

export default UnfinishedPathway;
