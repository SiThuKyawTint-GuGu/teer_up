"use client";
import { Button } from "@/components/ui/Button";
import { InputSearch } from "@/components/ui/Inputs";
import { Box, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const comboboxRef = useRef<any>(null);
  const router = useRouter();

  const debouncedOnChange = debounce(() => {
    setSearchValue(comboboxRef?.current?.value);
  }, 500);

  return (
    <Grid>
      <Container className="space-y-[]">
        <Box py="2" className="bg-white">
          <header className="w-full max-w-[400px] h-[48px] mx-auto">
            <Flex justify="between" align="center" height="100%" px="3" position="relative">
              <InputSearch variant="contain" className="text-primary" placeholder="Search" />
              <Button variant="ghost">Cancel</Button>
            </Flex>
          </header>
        </Box>
        <Section pb="4" py="5" px="3">
          <Box className="space-y-[10px] pb-[20px] mb-[30px] border-b border-b-[#BDC7D5]">
            <Heading as="h5" size="3" weight="medium">
              History
            </Heading>
            <Flex justify="start" align="center" gap="2">
              <Button variant="outline">Career</Button>
              <Button variant="outline">Education</Button>
              <Button variant="outline">UX Design</Button>
            </Flex>
          </Box>
          <Box className="space-y-[6px]">
            <Heading as="h5" size="3" weight="medium">
              Suggested for you
            </Heading>
            <ul className="flex justify-start items-start flex-wrap list-square list-primary pl-5 marker:text-primary space-y-[6px]">
              <li className="w-1/2">Career advice</li>
              <li className="w-1/2">Career advice</li>
              <li className="w-1/2">Interview tips</li>
              <li className="w-1/2">Interview tips</li>
              <li className="w-1/2">Build and maintain support system</li>
              <li className="w-1/2">Build and maintain support system</li>
            </ul>
          </Box>
        </Section>
      </Container>
    </Grid>
  );
};

export default Search;
