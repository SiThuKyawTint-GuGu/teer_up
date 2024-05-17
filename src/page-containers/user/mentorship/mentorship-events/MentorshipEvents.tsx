import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Heading } from "@radix-ui/themes";

type EventProp = {
  image_url: string;
  title: string;
  date: string;
};

const MentorshipEvents = () => {
  const events = [
    {
      image_url:
        "https://images.unsplash.com/photo-1715509772716-80b34786677b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentorship 101",
      date: "10 April 2024 . 03 May 2024",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1715509772716-80b34786677b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mentorship 301",
      date: "10 April 2024 . 03 May 2024",
    },
  ];

  return (
    <Flex direction="column" p="4" gap="3">
      <Flex direction="row" justify="between" align="center">
        <Box>
          <Heading as="h6" size="7">
            Explore Mentors
          </Heading>
        </Box>
        <Box>
          <Text className="ml-auto">
            <p className="text-primary text-[16px] font-[600] me-3">All</p>
          </Text>
        </Box>
      </Flex>
      <Flex direction="column" gap="3">
        {events?.map((each: EventProp, key: number) => (
          <>
            <CardBox className="w-full h-20 bg-white rounded-lg">
              <Flex direction="row" gap="3">
                <img src={each?.image_url} alt="event cover img" className="object-cover h-20 w-20 rounded-lg" />
                <Box>
                  <Text className="block text-[16px] font-[600] text-[#373A36] mb-0">{each?.title}</Text>
                  <Text className="text-[12px] font-[400] text-[#373A36]">{each?.date}</Text>
                </Box>
              </Flex>
            </CardBox>
          </>
        ))}
      </Flex>
    </Flex>
  );
};

export default MentorshipEvents;
