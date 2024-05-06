"use client";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Grid, Heading, Section } from "@radix-ui/themes";
import React from "react";

const NotificationPage: React.FC = () => {
  return (
    <Grid columns="1">
      <Box>
        <Section py="4" px="3">
          <Heading mb="3">Notifications</Heading>
          <Box className="space-y-4">
            <Text className="text-sm">Notifications</Text>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default NotificationPage;
