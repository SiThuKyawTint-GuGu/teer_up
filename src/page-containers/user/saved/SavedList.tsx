"use client";
import Loading from "@/app/loading";
import BGImage from "@/components/shared/BGImage";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import {
  SAVED_CONTENT_TYPES,
  SavedContentParams,
  useGetSavedContents,
  useGetUnfinishedPathway,
  useSaveContent,
} from "@/services/content";
import { SavedContentResponse, UnfinishedPathwayResponse } from "@/types/SavedContent";
import { capitalizeFirstLetter } from "@/utils";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, IconButton, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { useState } from "react";
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

const SavedList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [content, setContent] = useState<number>(0);
  const { trigger: contentSave } = useSaveContent();
  const [triggerType, setTriggerType] = useState<TRIGGER_TYPE>();
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [filteredType, setFilterTypes] = useState<
    {
      key: SAVED_CONTENT_TYPES;
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
    value: string;
  }>({
    key: filterNames[0].key,
    value: filterNames[0].value,
  });
  const {
    data: savedContents,
    mutate,
    isLoading,
  } = useGetSavedContents<SavedContentParams, SavedContentResponse>({
    type: filteredParams.key === SAVED_CONTENT_TYPES.ALL ? "" : filteredParams.key,
  });
  const { data: unFinishedPathways } = useGetUnfinishedPathway<UnfinishedPathwayResponse>();

  // const DropdownMenu = () => {
  //   return (

  //   );
  // };

  const unSaveContent = async () => {
    await contentSave({
      id: content,
    });
    await mutate();
  };

  const handleCheckFilter = (each: { key: SAVED_CONTENT_TYPES; value: string }) => {
    if (each.key === SAVED_CONTENT_TYPES.ALL) {
      setFilterTypes([each]);
      return;
    }

    let filteredData = filteredType.filter(data => data.key !== SAVED_CONTENT_TYPES.ALL);
    const isExist = filteredData.find(data => data.key === each.key);
    if (isExist) {
      filteredData = filteredData.filter(data => data.key !== each.key);
      if (filteredData.length === 0) {
        setFilterTypes([
          {
            key: SAVED_CONTENT_TYPES.ALL,
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

  const toggleMenu = (data: any) => {
    setContent(data.content_id);
    setIsMenuVisible(isMenuVisible && data.content_id == content ? !isMenuVisible : true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={val => setOpen(val)}>
      <Grid columns="1">
        <Box>
          <Flex justify="between" align="center" className="bg-white" p="3">
            <Heading as="h6" size="7" align="left">
              Saved items
            </Heading>
            <DialogTrigger asChild onClick={() => setTriggerType(TRIGGER_TYPE.FILTER)}>
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
          <Box className="pb-[50px]">
            <Section className="" py="4" px="3">
              {unFinishedPathways?.data && unFinishedPathways?.data?.length > 0 && (
                <Link href="/saved/unfinished-pathway">
                  <Button variant="outline" className="w-full mb-4">
                    Continue unfinished pathway
                  </Button>
                </Link>
              )}
              {savedContents?.data?.length ? (
                savedContents?.data?.map((each, key) => (
                  <Box key={key} pb="4">
                    <CardBox className="p-[8px] bg-white">
                      <Flex justify="between" align="start" gap="2">
                        <Link key={key} href={`/content/${each?.content?.slug}`} className="w-3/4">
                          <Flex justify="start" align="start" gap="2">
                            <BGImage
                              width="128px"
                              height="100px"
                              className="rounded-[4px]"
                              url={each?.content?.image_url}
                            />
                            <Flex className="text-[#373A36] space-y-1" direction="column" wrap="wrap">
                              <Text>{each?.content?.title}</Text>
                              <Text size="2" weight="light">
                                <Text as="span" className="capitalize">
                                  {each?.content?.type}
                                </Text>{" "}
                                . Saved {dayjs(each?.created_at).fromNow()}
                              </Text>
                            </Flex>
                          </Flex>
                        </Link>
                        <IconButton size="2" variant="ghost" onClick={() => toggleMenu(each)}>
                          <Icons.moreOption className={cn("w-[24px] h-[24px] text-[#5B6770]", "text-[#8d9499]")} />
                        </IconButton>
                        {isMenuVisible && content == each.content_id && (
                          <div className="dropdown-menu h-[100px] bg-red-600 flex items-center justify-center rounded ">
                            <ul>
                              <li onClick={unSaveContent} className="p-1 cursor-pointer text-white">
                                Unsave
                              </li>
                            </ul>
                          </div>
                        )}
                        {/* <DropdownMenu /> */}
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
      <DialogContent
        className={cn(
          "bg-white top-[initial] bottom-0 px-4 py-8 translate-y-0 rounded-10px-tl-tr",
          triggerType === TRIGGER_TYPE.UNFINISHED && "top-0 rounded-none"
        )}
      >
        <Text className="text-[20px] font-bold">Show only</Text>
        <Box>
          {filterNames.map((each, key) => (
            <div
              key={key}
              className={cn(
                "pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]",
                filteredType.find(data => data.key === each.key) && "text-primary",
                key === filterNames.length - 1 && "border-none"
              )}
              onClick={() => {
                handleCheckFilter(each);
              }}
            >
              <Flex justify="between" align="center" gap="2">
                <Text as="label" weight="bold" size="3">
                  {each.value}
                </Text>
                <Icons.check className="text-lg" />
              </Flex>
            </div>
          ))}
          <DialogClose
            className="w-full"
            onClick={async () => {
              setFilterParams({
                key: filteredType.map(data => data.key).join(","),
                value: filteredType[0].value,
              });
            }}
          >
            <Button className="w-full">Apply filters</Button>
          </DialogClose>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SavedList;
