import { Icons } from "@/components/ui/Images";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import MentorCard from "../MentorCard";

const ExploreMentors = () => {
  return (
    <>
      <Flex direction="column" p="4" gap="3">
        <Flex direction="row" justify="between" align="center">
          <Box>
            <Heading as="h6" size="7">
              Explore Mentors
            </Heading>
            <Text as="p" size="2">
              They are over 1345 mentors on TEE-UP.
            </Text>
          </Box>
          <Box>
            <Icons.filterIcon className="w-[20px] h-[20px]" />
          </Box>
        </Flex>
        <Grid columns="2" gap="2">
          {Array.from({ length: 10 }, (_, index) => (
            <MentorCard key={index} />
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default ExploreMentors;
