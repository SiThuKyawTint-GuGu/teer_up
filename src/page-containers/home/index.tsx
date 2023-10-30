import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import React from "react";

const Home: React.FC = () => {
  return (
    <Grid rows="1">
      <Container>
        <Section>
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
            <Text align="center" size="2" className="text-[#68737a]">
              TEE-Up is your trusted companion and community, designed specifically for students and young adults, as
              you navigate adulthood with purpose and confidence.
            </Text>
            <Text align="center" size="2" className="text-[#68737a]">
              Together with Gen Zs and career experts, we’ve specially selected resources and exciting opportunities to
              level up your career game.
            </Text>
            <Text align="center" size="2" className="text-[#68737a]">
              Take the reins, set your goals, and go forth on your epic career journey!
            </Text>
          </Box>
          <Box>
            <Button className="w-full">
              Get Started
              <Icons.rightArrow />
            </Button>
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Box>
        </Section>
      </Container>
    </Grid>
  );
};

export default Home;
