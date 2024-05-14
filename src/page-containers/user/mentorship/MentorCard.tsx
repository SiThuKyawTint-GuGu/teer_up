import { Icons } from "@/components/ui/Images";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";

const MentorCard = () => {
  return (
    <Card>
      <Flex direction="column" gap="3" justify="center" align="center">
        <Avatar
          size="5"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="T"
        />
        <Text as="p" size="5" weight="bold">
          Teodros Girmay
        </Text>
        <Flex direction="column" justify="center" align="center" gap="2">
          <Text as="p" size="2">
            Design Thinking Research
          </Text>
          <Text as="p" size="2">
            Quick Prototyping
          </Text>
        </Flex>
        <Flex justify="between" gap="4" className="w-full">
          <Box className="flex items-center gap-1">
            <Icons.heartIcon width={10} height={10} activeFill="#ff0000" active />
            <span>34</span>
          </Box>
          <Box className="flex items-center gap-1">
            <Icons.commentIcon width={10} height={10} fill="#373A36" />
            <span>34</span>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};

export default MentorCard;
