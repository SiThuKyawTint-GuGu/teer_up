"use client";
import { Box, Grid, Heading, Section } from "@radix-ui/themes";
import React from "react";


interface Props {
  headerText: string;
  optionText: string;
}

const TitleHeader: React.FC<Props> = ({headerText,optionText}) => {
  return (
    <Grid columns="1">
      <Box>
        <Section py="0" px="0">
          <div className=" flex justify-between">
            <Heading mb="3">{headerText}</Heading>
            <p className="mt-2 text-[18px] font-[600] text-primary">{optionText}</p>
          </div>
        </Section>
      </Box>
    </Grid>
  );
};

export default TitleHeader;
