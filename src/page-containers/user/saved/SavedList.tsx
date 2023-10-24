"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons, Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useGetSavedContents } from "@/services/content";
import { SavedContentResponse } from "@/types/SavedContent";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import React, { useState } from "react";

const SavedList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: savedContents } = useGetSavedContents<ParamsType, SavedContentResponse>();

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
                All
                <Icons.caretDown />
              </Button>
            </DialogTrigger>
          </Flex>
          <Box className="pb-[7px] bg-[#F8F9FB]">
            <Section className="" py="4" px="3">
              {savedContents?.data?.map((each, key) => (
                <Box key={key} pb="4">
                  <CardBox className="p-[8px]">
                    <Flex justify="start" align="start" gap="2">
                      <Image
                        src={each?.image_url}
                        className="w-[128px] h-[100px]"
                        width={128}
                        height={100}
                        alt="saved image"
                      />
                      <Flex className="text-[#373A36] space-y-1" direction="column" wrap="wrap">
                        <Text>{each.title}</Text>
                        <Text size="2" weight="light">
                          {each.type} . Saved 2d ago
                        </Text>
                      </Flex>
                    </Flex>
                  </CardBox>
                </Box>
              ))}
            </Section>
          </Box>
        </Box>
      </Grid>
      <DialogContent className="bg-white top-[initial] bottom-0 px-4 py-8 translate-y-0">
        <Text className="text-[20px] font-bold">Show only</Text>
        <Box>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5] text-primary">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                All content types
              </Text>
              <Icons.check />
            </Flex>
          </div>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                Article
              </Text>
            </Flex>
          </div>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                Event
              </Text>
            </Flex>
          </div>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                Opportunity
              </Text>
            </Flex>
          </div>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                Pathway
              </Text>
            </Flex>
          </div>
          <div className="pb-[10px] mb-[10px] border-b border-b-[#BDC7D5]">
            <Flex justify="between" align="center" gap="2">
              <Text as="label" weight="bold" size="3">
                Video
              </Text>
            </Flex>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SavedList;
