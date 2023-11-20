"use client";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
const ReferFriend = () => {
  return (
    <Grid columns="1">
      <Box>
        <Flex justify="between" align="center" className="bg-white" p="3">
          <Link href="/profile/setting">
            <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
          </Link>
          <Text size="3" weight="medium">
            Refer a friend
          </Text>
          <Link href="/" className="opacity-0">
            <Icons.plus className="text-primary w-[23px] h-[23px]" />
          </Link>
        </Flex>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Heading mb="3">Refer a friend</Heading>
          <Box className="space-y-4">
            <Text className="text-sm">
              This is the text for how the refer works. And how this action would benefit both parties.
            </Text>
            <Text className="text-sm">
              nascetur faucibus. Turpis quis ligula sit maecenas pretium anlandit nascetur faucibus. Turpis quis ligula
              sit
            </Text>
            <Text className="text-sm">
              maecenas pretium ante commodo quis velit. Id et augue in fermentum pellentesque diam. Ultricies at turpis
              eget in vitae sit velit id proin. Lorem ipsum dolor sit amet consectetur. Pharetra sed habitant nullam
              odio blandit nascetur faucibus. Turpis quis ligula
            </Text>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default ReferFriend;
