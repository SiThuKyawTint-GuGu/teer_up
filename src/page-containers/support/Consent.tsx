"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const Consent: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  return (
    <Grid columns="1">
      <Box>
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <Button onClick={() => startTransition(() => router.back())} variant="ghost" className="p-0 h-auto">
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </Button>

              <Text size="3" weight="medium">
                Consent
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Box className="space-y-4">
            <Heading as="h5" className="text-black text-2xl font-semibold">
              Consent
            </Heading>
            <Text className="text-sm">
              By clicking on “Next”, I confirm that I have read, understood and given my consent for Prudential
              Assurance Company Singapore and its related corporations, respective representatives, agents, third party
              service providers, contractors and/or appointed distribution/business partners (collectively referred to
              as “Prudential”), and Small and Medium-sized Enterprises (“SME”) to collect, use, disclose and/or process
              my/our personal data for the purpose(s) of:
            </Text>
            <Text className="text-sm">
              <ul>
                <li>1) Registration for TEE-Up Programme application.</li>
                <li>2) Events and Courses sign ups.</li>
                <li>3) Internship or Job applications.</li>
                <li>4) Educational and promotional purposes.</li>
              </ul>
            </Text>
            <Text className="text-sm">
              I understand that I can refer to Prudential Data Privacy, which is available at{" "}
              <Link href="https://www.prudential.com.sg/Privacy-Notice" target="_blank">
                <Text as="span" className="text-primary">
                  Privacy Notice
                </Text>{" "}
              </Link>
              for more information.
            </Text>
            <Text>
              I may contact{" "}
              <Text as="span" className="text-primary">
                <a target="_blank" href="mailto:innovation@prudential.com.sg">
                  innovation@prudential.com.sg
                </a>
              </Text>{" "}
              on how I may access and correct my personal data or withdraw consent to the collection, use or disclosure
              of my personal data.
            </Text>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default Consent;
