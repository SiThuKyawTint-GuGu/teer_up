"use client";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import fetcher from "@/lib/fetcher";
import { CONTENT_HISTORY_TYPES } from "@/services/content";
import { ContentHistoryData } from "@/types/SavedContent";
import { trimmedText } from "@/utils";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import ContentFilterDialog, { filterNames } from "./components/ContentFilterDialog";
dayjs.extend(relativeTime);

type ContentType = {
  image: string;
  title: string;
  type: string;
  created_at: string;
  id: number;
  updated_at?: string;
};

const demoData: ContentType[] = [
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Article",
    created_at: "2023-09-09T10:00:00",
    id: 1,
  },
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Event",
    created_at: "2023-09-09T10:00:00",
    id: 2,
  },
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Mentor",
    created_at: "2023-09-09T10:00:00",
    id: 3,
  },
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Opportunity",
    created_at: "2023-09-09T10:00:00",
    id: 4,
  },
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Pathway",
    created_at: "2023-09-09T10:00:00",
    id: 5,
  },
  {
    image: "https://via.placeholder.com/150",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper volutpat libero vitae feugiat. Duis ac tempor arcu. Sed ac turpis neque. Vestibulum hendrerit neque ac magna tincidunt molestie",
    type: "Video",
    created_at: "2023-09-09T10:00:00",
    id: 6,
  },
];

const ContentHistoryPage: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  // const { data, error, isLoading } = useGetContentHistoryInfinite<ContentHistoryResponse>();

  const {
    data: contentHistoyData,
    mutate,
    isLoading,
    setSize,
    isValidating,
  } = useSWRInfinite(index => `/user/content/histories?page=${index + 1}&pagesize=${20}`, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    parallel: false,
  });

  const issues: any = contentHistoyData ? [].concat(...contentHistoyData) : [];

  const contentDataArray: any = useMemo(() => issues?.flatMap((page: any) => page?.data) || [], [issues]);

  useEffect(() => {
    if (contentHistoyData) {
      const lastPage = contentHistoyData[contentHistoyData.length - 1];
      if (lastPage?.data?.length === 0) {
        setSize(contentHistoyData.length - 1);
      }
    }
  }, [contentHistoyData]);

  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setSize(size => size + 1);
    }
  };

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const container = containerRef.current;
  //     container.addEventListener("scroll", handleScroll);
  //     return () => {
  //       container.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, [containerRef.current]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const newIndex = Math.round(scrollPosition / 400);
        setVisibleItemIndex(newIndex);
        if (container.scrollHeight - container.scrollTop - container.clientHeight < 1) {
          setSize(s => s + 1);
        }
      };
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [visibleItemIndex]);

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

  function capitalizeFirstLetter(string: string) {
    if (!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleCheckFilter = (each: { key: CONTENT_HISTORY_TYPES; value: string }) => {
    if (each.key === CONTENT_HISTORY_TYPES.ALL) {
      setFilterTypes([each]);
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
        return;
      }
      setFilterTypes(filteredData);
      return;
    }

    setFilterTypes([...filteredData, each]);
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
        <Box ref={containerRef}>
          <div className="mb-[45px]">
            <div className="max-w-[400px] fixed w-full">
              <Flex justify="between" position="relative" className="bg-white" p="3">
                <Heading as="h4" className="font-bold" size="7" align="left">
                  Content History
                </Heading>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-primary">
                    {capitalizeFirstLetter(filteredParams?.key?.split(",")?.[0])}
                    {filteredParams.key.split(",").length > 1 && ` + ${filteredParams.key.split(",").length - 1} more`}
                    {/* {
                  filteredType.find(data => data.key === filteredParams.key)?.value ||
                  filteredParams.value
                } */}
                    <Icons.caretDown />
                  </Button>
                </DialogTrigger>
              </Flex>
            </div>
          </div>

          <Box className="pb-[50px] pt-[20px]">
            <Section className="" py="4" px="3">
              {contentDataArray ? (
                contentDataArray.map((each: ContentHistoryData, key: number) => (
                  <Box key={key} pb="4">
                    <CardBox
                      className="p-[8px] bg-white cursor-pointer overflow-hidden shadow-lg"
                      onClick={() => router.push(`/content/${each?.id}`)}
                    >
                      <Flex justify="start" align="start">
                        {/* <BGImage width="128px" height="100px" className="rounded-[4px] mr-2" url={each?.image} /> */}
                        <Image
                          src={each?.image_url}
                          width={128}
                          height={100}
                          className="rounded-[4px] mr-2"
                          alt="
                        content thumbnail
                        "
                        />
                        <Flex className="text-[#373A36] space-y-1 w-[calc(100%-160px)]" direction="column" wrap="wrap">
                          <Text weight="medium">{trimmedText(each?.title, 100)}</Text>
                          <Text size="2" weight="light" className="flex gap-2 items-baseline">
                            <Text as="span" className="text-sm">
                              {each?.type}
                            </Text>
                            <Text className="text-sm">{dayjs(each?.created_at).fromNow()}</Text>
                          </Text>
                        </Flex>
                      </Flex>
                    </CardBox>
                  </Box>
                ))
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
