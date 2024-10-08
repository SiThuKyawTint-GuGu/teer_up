"use client";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import fetcher from "@/lib/fetcher";
import { CONTENT_HISTORY_TYPES, ParamsType, SavedContentParams, useGetContentHistory } from "@/services/content";
import { ContentHistoryData, ContentHistoryResponse } from "@/types/SavedContent";
import { trimmedText } from "@/utils";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import ContentFilterDialog, { filterNames } from "./components/ContentFilterDialog";
import Loading from "@/app/loading";
dayjs.extend(relativeTime);

type ContentType = {
  image: string;
  title: string;
  type: string;
  created_at: string;
  id: number;
  updated_at?: string;
};

const ContentHistoryPage: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [content, setContent] = useState<ContentHistoryData[]>();

  const [filteredType, setFilterTypes] = useState<
    {
      key: CONTENT_HISTORY_TYPES;
      value: string;
    }[]
  >([
    {
      key: filterNames[0].key,
      value: filterNames[0].value,
    },
  ]);
  const [filteredParams, setFilterParams] = useState<{
    key: string;
  }>({
    key: filterNames[0].key,
  });

  const {
    data: contentHistory,
    error,
    isLoading,
  } = useGetContentHistory<SavedContentParams, ContentHistoryResponse>({
    type: filteredParams.key === CONTENT_HISTORY_TYPES.ALL ? "" : filteredParams.key,
    page: pageIndex,
  });

  useEffect(() => {
    if (pageIndex > 1) {
      setContent(prev => {
        if (!contentHistory?.data) return prev;
        return prev ? [...prev, ...contentHistory?.data] : contentHistory?.data;
      });
    } else {
      setContent(contentHistory?.data);
    }
  }, [contentHistory?.data]);

  function capitalizeFirstLetter(string: string) {
    if (!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleCheckFilter = (each: { key: CONTENT_HISTORY_TYPES; value: string }) => {
    if (each.key === CONTENT_HISTORY_TYPES.ALL) {
      setFilterTypes([each]);
      setPageIndex(1);
      return;
    }

    let filteredData = filteredType.filter(data => data.key !== CONTENT_HISTORY_TYPES.ALL);
    const isExist = filteredData.find(data => data.key === each.key);
    if (isExist) {
      filteredData = filteredData.filter(data => data.key !== each.key);
      if (filteredData.length === 0) {
        setFilterTypes([
          {
            key: CONTENT_HISTORY_TYPES.ALL,
            value: "All content types",
          },
        ]);
        setPageIndex(1);
        return;
      }
      setFilterTypes(filteredData);
      setPageIndex(1);
      return;
    }

    setFilterTypes([...filteredData, each]);
    setPageIndex(1);
    return;
  };

  return (
    <ContentFilterDialog
      open={open}
      setOpen={setOpen}
      filteredType={filteredType}
      setFilterTypes={setFilterTypes}
      filteredParams={filteredParams}
      setFilterParams={setFilterParams}
      handleCheckFilter={handleCheckFilter}
    >
      <Grid columns="1">
        <Box>
          <div className="mb-[45px]">
            <div className="max-w-[400px] fixed w-full">
              <Flex justify="between" position="relative" className="bg-white" p="3">
                <Heading as="h4" className="font-bold" size="7" align="left">
                  Content History
                </Heading>
                {filteredParams.key === "all" ? (
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-primary">
                      All
                      <Icons.caretDown />
                    </Button>
                  </DialogTrigger>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-primary"
                    onClick={() => {
                      setFilterTypes([
                        {
                          key: CONTENT_HISTORY_TYPES.ALL,
                          value: "All content types",
                        },
                      ]);
                      setFilterParams({
                        key: "all",
                      });
                      setPageIndex(1);
                    }}
                  >
                    Clear filter ({filteredParams.key.split(",").length})
                  </Button>
                )}
              </Flex>
            </div>
          </div>

          <Box className="pb-[50px] pt-[20px]">
            <Section className="" py="4" px="3">
              {content ? (
                <>
                  {content.map((each: ContentHistoryData, key: number) => (
                    <Box key={key} pb="4">
                      <CardBox
                        className="p-[8px] bg-white cursor-pointer overflow-hidden shadow-lg"
                        onClick={() => router.push(`/content/${each?.slug}`)}
                      >
                        <Flex justify="start" align="start">
                          {/* <BGImage width="128px" height="100px" className="rounded-[4px] mr-2" url={each?.image} /> */}
                          <Image
                            src={each?.image_url}
                            width={128}
                            height={100}
                            className="rounded-[4px] mr-2 w-[128px] h-[100px] overflow-hidden object-cover"
                            alt="content thumbnail"
                          />
                          <Flex
                            className="text-[#373A36] space-y-1 w-[calc(100%-160px)]"
                            direction="column"
                            wrap="wrap"
                          >
                            <Text weight="medium">{trimmedText(each?.title, 100)}</Text>
                            <Text size="2" weight="light" className="flex gap-2 items-baseline">
                              <Text as="span" className="text-sm capitalize">
                                {each?.type}
                              </Text>
                              <Text className="text-sm">{dayjs(each?.last_watched_time).fromNow()}</Text>
                            </Text>
                          </Flex>
                        </Flex>
                      </CardBox>
                    </Box>
                  ))}
                  {contentHistory?.hasNextPage ? (
                    <Button variant="outline" className="" onClick={() => setPageIndex(prev => prev + 1)}>
                      Load more
                    </Button>
                  ) : null}
                </>
              ) : (
                <>
                  <NotFound
                    icon={<Image src="/uploads/icons/saved-icon.svg" width={80} height={80} alt="saved" />}
                    content={
                      <>
                        <Text className="text-[16px]">There’s no items saved.</Text>
                        <Text className="text-[16px]">Items saved will be added here.</Text>
                      </>
                    }
                    link={
                      <Link href="/home">
                        <Button className="mt-[16px] text-[18px]">Browse now</Button>
                      </Link>
                    }
                  />
                </>
              )}
            </Section>
          </Box>
        </Box>
      </Grid>
    </ContentFilterDialog>
  );
};

export default ContentHistoryPage;
