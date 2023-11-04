"use client";
import BGImage from "@/components/shared/BGImage";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { SAVED_CONTENT_TYPES, SavedContentParams, useGetSavedContents } from "@/services/content";
import { SavedContentResponse } from "@/types/SavedContent";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { useState } from "react";
dayjs.extend(relativeTime);

// "All content types", "Article", "Event", "Opportunity", "Pathway", "Video"

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

const SavedList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [filteredType, setFilterTypes] = useState<{
    key: SAVED_CONTENT_TYPES;
    value: string;
  }>({
    key: filterNames[0].key,
    value: filterNames[0].value,
  });
  const { data: savedContents } = useGetSavedContents<SavedContentParams, SavedContentResponse>({
    type: filteredType.key === SAVED_CONTENT_TYPES.ALL ? "" : filteredType.key,
  });

  return (
    <Dialog open={open} onOpenChange={val => setOpen(val)}>
      <Grid columns="1">
        <Box>
          <Flex justify="between" align="center" className="bg-white" p="3">
            <Heading as="h6" size="4" align="left">
              Saved items
            </Heading>
            <DialogTrigger>
              <Button variant="ghost" className="text-primary">
                {filteredType.key === SAVED_CONTENT_TYPES.ALL ? "All" : filteredType.value}
                <Icons.caretDown />
              </Button>
            </DialogTrigger>
          </Flex>
          <Box className="pb-[7px]">
            <Section className="" py="4" px="3">
              {savedContents?.data?.length ? (
                savedContents?.data?.map((each, key) => (
                  <Link key={key} href={`/content/${each?.content?.slug}`}>
                    <Box pb="4">
                      <CardBox className="p-[8px]">
                        <Flex justify="start" align="start" gap="2">
                          <BGImage width={128} height={100} url={each?.content?.image_url} />
                          <Flex className="text-[#373A36] space-y-1 w-3/4" direction="column" wrap="wrap">
                            <Text>{each?.content?.title}</Text>
                            <Text size="2" weight="light">
                              <Text as="span" className="capitalize">
                                {each?.content?.type}
                              </Text>{" "}
                              . Saved {dayjs(each?.created_at).fromNow()}
                            </Text>
                          </Flex>
                        </Flex>
                      </CardBox>
                    </Box>
                  </Link>
                ))
              ) : (
                <>
                  <NotFound
                    icon={<Image src="/uploads/icons/saved-icon.svg" width={80} height={80} alt="saved" />}
                    content={
                      <>
                        <Text>There’s no items saved.</Text>
                        <Text>Items saved will be added here.</Text>
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
      <DialogContent className="bg-white top-[initial] bottom-0 px-4 py-8 translate-y-0 rounded-10px-tl-tr">
        <Text className="text-[20px] font-bold">Show only</Text>
        <Box>
          {filterNames.map((each, key) => (
            <div
              key={key}
              className={cn(
                "pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]",
                each.key === filteredType.key && "text-primary"
              )}
              onClick={() => setFilterTypes(each)}
            >
              <DialogClose className="w-full">
                <Flex justify="between" align="center" gap="2">
                  <Text as="label" weight="bold" size="3">
                    {each.value}
                  </Text>
                  <Icons.check />
                </Flex>
              </DialogClose>
            </div>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SavedList;
