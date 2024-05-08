"use client";
import Loading from "@/app/loading";
import BGImage from "@/components/shared/BGImage";
import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { DialogTrigger } from "@/components/ui/Dialog";

import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import {
  CONTENT_HISTORY_TYPES,
  SavedContentParams,
  useGetSavedContents,
  useGetUnfinishedPathway,
  useSaveContent,
} from "@/services/content";
import { SavedContent, SavedContentResponse, TRIGGER_TYPE, UnfinishedPathwayResponse } from "@/types/SavedContent";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Heading, IconButton, Section, Tabs } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import ContentFilterDialog from "../content-history/components/ContentFilterDialog";
import { trimmedText } from "@/utils";
import UnfinishedPathway from "./UnfinishedPathway";
dayjs.extend(relativeTime);

const filterNames = [
  {
    key: CONTENT_HISTORY_TYPES.ALL,
    value: "All content types",
  },
  {
    key: CONTENT_HISTORY_TYPES.ARTICLE,
    value: "Article",
  },
  {
    key: CONTENT_HISTORY_TYPES.EVENT,
    value: "Event",
  },
  {
    key: CONTENT_HISTORY_TYPES.OPPORTUNITY,
    value: "Opportunity",
  },
  {
    key: CONTENT_HISTORY_TYPES.PATHWAY,
    value: "Pathway",
  },
  {
    key: CONTENT_HISTORY_TYPES.VIDEO,
    value: "Video",
  },
];

const SavedList: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openUnsaved, setOpenUnsaved] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [content, setContent] = useState<number>(0);
  const { trigger: contentSave } = useSaveContent();
  const [triggerType, setTriggerType] = useState<TRIGGER_TYPE>();
  const { get } = useSearchParams();
  const pathname = usePathname();

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
    data: savedContents,
    mutate,
    isLoading,
  } = useGetSavedContents<SavedContentParams, SavedContentResponse>({
    type: filteredParams.key === CONTENT_HISTORY_TYPES.ALL ? "" : filteredParams.key,
  });
  const { data: unFinishedPathways } = useGetUnfinishedPathway<UnfinishedPathwayResponse>();

  const handleTabTrigger = (key: string) => {
    router.push(`${pathname}?tab=${key}`);
  };

  function capitalizeFirstLetter(string: string) {
    if (!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const unSaveContent = async (e: any) => {
    e.stopPropagation();
    await contentSave({
      id: content,
    });
    await mutate();
  };

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

  const toggleMenu = (data: SavedContent) => {
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
    <ContentFilterDialog
      trigger_type={triggerType}
      open={open}
      setOpen={setOpen}
      filteredType={filteredType}
      setFilterTypes={setFilterTypes}
      filteredParams={filteredParams}
      setFilterParams={setFilterParams}
      handleCheckFilter={handleCheckFilter}
      unSaveContent={unSaveContent}
    >
      <Grid columns="1">
        <Box>
          <div className="mb-[45px]">
            <div className="max-w-[400px] fixed w-full">
              <Flex justify="between" position="relative" className="bg-white" p="3">
                <Heading as="h6" size="7" align="left">
                  {get("tab") === "unfinishpathways" ? "Unfinished Pathway" : "Saved Items"}
                </Heading>
                <DialogTrigger asChild onClick={() => setTriggerType(TRIGGER_TYPE.FILTER)}>
                  <Button variant="ghost" className="text-primary">
                    {capitalizeFirstLetter(filteredParams?.key?.split(",")?.[0])}
                    {filteredParams.key.split(",").length > 1 && ` + ${filteredParams.key.split(",").length - 1} more`}
                    <Icons.caretDown />
                  </Button>
                </DialogTrigger>
              </Flex>
            </div>
          </div>
          <Section className="" pt="4" pb="0">
            <Tabs.Root defaultValue={(get("tab") ? get("tab") : "items") ?? ""}>
              <Tabs.List className="space-x-[20px] px-3 flex justify-start bg-white max-w-[400px] ">
                <Tabs.Trigger
                  onClick={() => handleTabTrigger("items")}
                  className="tab-trigger cursor-pointer text-lg"
                  value="items"
                >
                  Save Items
                </Tabs.Trigger>
                <Tabs.Trigger
                  onClick={() => handleTabTrigger("unfinishpathways")}
                  className="tab-trigger cursor-pointer text-lg"
                  value="unfinishpathways"
                >
                  Unfinished Pathways
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="items" className="space-y-[7px] p-2">
                <Box>
                  <Section className="" py="4" px="3">
                    {savedContents?.data?.length ? (
                      savedContents?.data?.map((each, key) => (
                        <Box key={key} pb="4">
                          <CardBox
                            className="p-[8px] bg-white cursor-pointer overflow-hidden shadow-lg"
                            onClick={() => router.push(`/content/${each?.content?.id}`)}
                          >
                            <Flex justify="start" align="start">
                              <BGImage
                                width="128px"
                                height="100px"
                                className="rounded-[4px] mr-2"
                                url={each?.content.image_url}
                              />

                              <Flex
                                className="text-[#373A36] space-y-1 w-[calc(100%-160px)]"
                                direction="column"
                                wrap="wrap"
                                justify="between"
                              >
                                <h3 className="text-base font-bold">{trimmedText(each?.content?.title, 30)}</h3>
                                <div className="flex gap-2 items-baseline ">
                                  <span className="text-sm capitalize">{each?.content?.type}</span>
                                  <span className="text-sm">{dayjs(each?.created_at).fromNow()}</span>
                                </div>
                              </Flex>

                              {/*more  Icon  */}
                              <DialogTrigger
                                asChild
                                onClick={() => {
                                  setTriggerType(TRIGGER_TYPE.UNSAVED);
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
              </Tabs.Content>

              <Tabs.Content value="unfinishpathways" className="p-2">
                <UnfinishedPathway
                  setTriggerType={setTriggerType}
                  toggleMenu={toggleMenu}
                  trigger_type={TRIGGER_TYPE.UNFINISHEDPATH}
                />
              </Tabs.Content>
            </Tabs.Root>
          </Section>
        </Box>
      </Grid>
    </ContentFilterDialog>
  );
};

export default SavedList;
