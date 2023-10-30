import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <Grid rows="1" className="max-w-[400px] m-auto">
      <Container className="h-screen">
        <header className="border-b border-[#e5e7eb] w-[400px] fixed top-0 bg-white">
          <Box px="3">
            <div className="h-[72px] flex items-center justify-between">
              <Link href="/">
                <Icons.teeUp />
              </Link>
            </div>
          </Box>
        </header>
        <Section className="bg-white space-y-6" py="4" px="3" mt="9">
          <Box className="space-y-4">
            <Flex justify="center" align="center">
              <Heading as="h3" size="6" align="center" weight="bold" className="text-primary max-w-[215px]">
                Kickstart your adulting journey
              </Heading>
            </Flex>
            <div className="w-full overflow-x-hidden">
              <Icons.landing />
            </div>
          </Box>
          <Box>
            <Heading as="h3" size="6" align="center" weight="bold" className="text-[#373a36]">
              For Gen Zs, by Gen Zs
            </Heading>
            <div className="space-y-2">
              <Text align="center" size="2" className="text-[#68737a]">
                TEE-Up is your trusted companion and community, designed specifically for students and young adults, as
                you navigate adulthood with purpose and confidence.
              </Text>
              <Text align="center" size="2" className="text-[#68737a]">
                Together with Gen Zs and career experts, we’ve specially selected resources and exciting opportunities
                to level up your career game.
              </Text>
              <Text align="center" size="2" className="text-[#68737a]">
                Take the reins, set your goals, and go forth on your epic career journey!
              </Text>
            </div>
          </Box>
          <Box className="space-y-6">
            <Link className="block" href="/home">
              <Button className="w-full">
                Get Started
                <Icons.rightArrow />
              </Button>
            </Link>
            <Link className="block" href="/auth/login">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </Box>
          <Box>
            <Flex justify="center" align="center" gap="2">
              <Text as="span" size="1" className="text-[#68737a]">
                Powered by
              </Text>
              <Icons.teeupFooter />
            </Flex>
          </Box>
        </Section>
      </Container>
    </Grid>
  );
};

export default Home;
