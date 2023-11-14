"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { InputSearch } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { SearchParamsType, useGetContentSearch } from "@/services/content";
import { ContentType } from "@/types/Content";
import { getLocalStorage, setLocalStorage } from "@/utils";
import { cn } from "@/utils/cn";
import { Box, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const { get } = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<any>(null);
  const [category, setCategory] = useState<string>();
  const { data: searchData } = useGetContentSearch<SearchParamsType, ContentType>({
    search: searchValue,
  });

  const histories = getLocalStorage("history") || [];
  const debouncedOnChange = debounce(() => {
    setSearchValue(inputRef?.current?.value);
    if (histories) {
      const newData = [...histories, inputRef?.current?.value];
      inputRef?.current?.value && setLocalStorage("history", newData);
    }
  }, 500);

  const handleSlotClick = () => {
    if (inputRef?.current?.value) {
      startTransition(() => {
        router.push(`/home?search=${inputRef?.current?.value}`);
      });
    }
  };

  const handleHistoryClick = (data: string) => {
    if (data) {
      startTransition(() => {
        router.push(`/home?search=${data}`);
      });
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSlotClick();
    }
  };

  useEffect(() => {
    setSearchValue(get("keyword") || "");
    setCategory(get("category") || "");
  }, [get]);

  return (
    <Grid>
      <Container className="space-y-[]">
        <Box py="2" className="bg-white">
          <header className="w-full max-w-[400px] h-[48px] mx-auto">
            <Flex onKeyDown={handleKeyPress} justify="between" align="center" height="100%" px="3" position="relative">
              <div className="pr-2" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <InputSearch
                onChange={debouncedOnChange}
                onSlotClick={handleSlotClick}
                ref={inputRef}
                variant="contain"
                className="caret-primary"
                placeholder="Search"
                defaultValue={get("keyword") || ""}
              />
              <Button onClick={handleSlotClick} className="pr-0" variant="ghost">
                Search
              </Button>
            </Flex>
          </header>
        </Box>
        <Section pb="4" py="5" px="3">
          {histories?.length > 0 && (
            <Box className="space-y-[10px] pb-[20px] mb-[30px] border-b border-b-[#BDC7D5]">
              <Heading as="h5" size="3" weight="medium">
                History
              </Heading>
              <Flex justify="start" wrap="wrap" align="center" gap="2">
                {(histories as string[])
                  ?.filter(each => each.trim() !== "")
                  .reverse()
                  .map((each, key) => {
                    if (key < 5) {
                      return (
                        <Button key={key} variant="outline" onClick={() => handleHistoryClick(each)}>
                          {each}
                        </Button>
                      );
                    }
                  })}
              </Flex>
            </Box>
          )}
          {/* <Box className="space-y-[6px]">
            <Heading as="h5" size="3" weight="medium">
              Suggested for you
            </Heading>
            <ul className="flex justify-start items-start flex-wrap list-square list-primary pl-5 marker:text-primary space-y-[6px]">
              <li className="w-full">Career advice</li>
              <li className="w-full">Career advice</li>
              <li className="w-full">Interview tips</li>
              <li className="w-full">Interview tips</li>
              <li className="w-full">Build and maintain support system</li>
              <li className="w-full">Build and maintain support system</li>
            </ul>
          </Box> */}
        </Section>
        {searchValue && (
          <div className="max-w-[400px] fixed top-[65px] z-20 w-full h-full bg-[#efefef]">
            <Box p="3">
              {searchData?.data?.length ? (
                <>
                  {searchData?.data?.map((each, key) => (
                    <>
                      <Link key={key} href={`/home?search=${each?.title}`}>
                        <Text
                          className={cn(
                            "pb-[10px] mb-[10px]",
                            key !== (searchData?.data ? searchData?.data.length - 1 : -1) &&
                              "border-b border-b-[#BDC7D5]"
                          )}
                        >
                          {each?.title}
                        </Text>
                      </Link>
                    </>
                  ))}
                  <Flex justify="center">
                    <Button onClick={handleSlotClick} variant="link">
                      See More
                    </Button>
                  </Flex>
                </>
              ) : (
                <Flex justify="center">No search found!</Flex>
              )}
            </Box>
          </div>
        )}
      </Container>
    </Grid>
  );
};

export default Search;
