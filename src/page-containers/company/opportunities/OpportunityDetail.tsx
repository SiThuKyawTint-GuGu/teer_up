"use client";

import { Button } from "@/components/ui/Button";
import { Icons, Image } from "@/components/ui/Images";
import { CompanyOpportunity } from "@/types/CompanyOpportunity";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";

const JobInfo = ({ data }: { data: CompanyOpportunity }) => {
  return (
    <>
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="2" my="3">
          <Typography variant="h6" fontWeight="bold">
            {data.content.title}
          </Typography>
          <Typography variant="caption" display="block">
            UI UX
          </Typography>
          <Typography variant="caption" display="block">
            A passionate developer UI UX designer who can use figma with 3 year of experience.
          </Typography>
        </Flex>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
              <Flex direction="column" justify="center" align="center">
                <Typography variant="caption" display="block">
                  Job ID
                </Typography>
                <Typography variant="caption" display="block">
                  123456
                </Typography>
              </Flex>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
              <Flex direction="column" justify="center" align="center">
                <Typography variant="caption" display="block">
                  Job Type
                </Typography>
                <Typography variant="caption" display="block">
                  Full Time
                </Typography>
              </Flex>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
              <Flex direction="column" justify="center" align="center">
                <Typography variant="caption" display="block">
                  Job ID
                </Typography>
                <Typography variant="caption" display="block">
                  123456
                </Typography>
              </Flex>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
              <Flex direction="column" justify="center" align="center">
                <Typography variant="caption" display="block">
                  Job Type
                </Typography>
                <Typography variant="caption" display="block">
                  Full Time
                </Typography>
              </Flex>
            </Box>
          </Grid>
        </Grid>
        <Flex direction="column" gap="2">
          <Typography variant="h6" fontWeight="bold">
            Job Description
          </Typography>
          <Typography variant="caption" display="block">
            {data.content.description}
          </Typography>
        </Flex>
        <Flex direction="column" gap="2">
          <Typography variant="h6" fontWeight="bold">
            Key Responsibility
          </Typography>
          <Flex direction="row" align="center" gap="3">
            <Icons.listLikedIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cumque.</p>
          </Flex>
          <Flex direction="row" align="center" gap="3">
            <Icons.listLikedIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, quos!</p>
          </Flex>
          <Flex direction="row" align="center" gap="3">
            <Icons.listLikedIcon />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorum.</p>
          </Flex>
          <Flex direction="row" align="center" gap="3">
            <Icons.listLikedIcon />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, saepe?</p>
          </Flex>
        </Flex>
        <Flex direction="column" gap="2">
          <Typography variant="h6" fontWeight="bold">
            Education
          </Typography>
          <ul className="list-disc list-inside">
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, pariatur?</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, pariatur?</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, pariatur?</li>
          </ul>
        </Flex>
        <Flex direction="column" gap="2">
          <Typography variant="h6" fontWeight="bold">
            Benefit
          </Typography>
          <Typography variant="caption" display="block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in non iure architecto nihil accusantium,
            quidem autem, quasi neque, fugiat cumque quae. Inventore corporis, praesentium quia quae delectus earum
            veritatis!
          </Typography>
        </Flex>
      </Flex>
    </>
  );
};

const Applicants = () => {
  return <>Job Applicants</>;
};

const OpportunityDetail = ({ data }: { data: CompanyOpportunity }) => {
  const [activeButton, setActiveButton] = useState("jobInfo");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <>
      <Container>
        <Typography variant="h6" fontWeight="bold">
          Job: {data.content.title}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Company: ABC Ltd
        </Typography>

        <Typography variant="h6" fontWeight="bold" my={4}>
          Applicant List
        </Typography>
        <Flex direction="column" p="4">
          <Grid container>
            <Grid item xs={4}>
              {data.content.title}
            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="center">
                <Grid item xs={2}>
                  <p>25</p>
                </Grid>
                <Grid item xs={2}>
                  <p>25</p>
                </Grid>
                <Grid item xs={3}>
                  <p>25</p>
                </Grid>
                <Grid item xs={2}>
                  <p>25</p>
                </Grid>
                <Grid item xs={2}>
                  <p>25</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <p className="text-sm">{data.location}</p>
            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="center">
                <Grid item xs={2}>
                  <p>Applicant</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Screened</p>
                </Grid>
                <Grid item xs={3}>
                  <p>Interviewed</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Offered</p>
                </Grid>
                <Grid item xs={2}>
                  <p>Hired</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Flex className="gap-2 my-6 max-w-[400px]">
            <Button
              className={`w-full rounded-none bg-transparent ${
                activeButton === "jobInfo"
                  ? " text-primary font-[600] border-b-2 border-primary"
                  : " text-[#373A36] font-[300]"
              } text-[16px] shadow-none  hover:bg-transparent`}
              onClick={() => handleButtonClick("jobInfo")}
            >
              Job Info
            </Button>
            <Button
              className={`w-full rounded-none bg-transparent ${
                activeButton === "applicants"
                  ? " text-primary font-[600] border-b-2 border-primary"
                  : " text-[#373A36] font-[300]"
              } text-[16px] shadow-none  hover:bg-transparent`}
              onClick={() => handleButtonClick("applicants")}
            >
              Applicants
            </Button>
          </Flex>
          <Box>
            {activeButton === "jobInfo" && <JobInfo data={data} />}
            {activeButton === "connections" && <Applicants />}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default OpportunityDetail;
