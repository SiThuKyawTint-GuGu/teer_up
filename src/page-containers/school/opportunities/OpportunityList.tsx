import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import OpportunitiyCard from "./OpportunitiyCard";

export interface Job {
  id: number;
  name: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
  jobID: string;
  Views: string;
  Saved: string;
}

const jobs: Job[] = [
  {
    id: 1,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 2,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 3,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 4,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 5,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 6,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
  {
    id: 7,
    name: "Software Engineer",
    company: "Google",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elementum consequat magna mauris ipsum vestibulum morbi. Eget eu luctus...",
    location: "Yangon",
    jobType: "Full-Time",
    jobID: "1111",
    Views: "12K",
    Saved: "12K",
  },
];
export default function OpportunityList() {
  // empty array 3

  return (
    <>
      <Box
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Opportunities
        </Typography>

        <Stack
          display="grid"
          gridTemplateColumns={{
            lg: "repeat(2, 1fr)",
          }}
          marginTop={4}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontSize={25} fontWeight={"medium"}>
              All opportunities
            </Typography>
            <Typography variant="body2">1 - {jobs.length} of many results</Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        gap={3}
        padding={4}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {jobs.map((job, index) => (
          <OpportunitiyCard
            key={job.id}
            {...job}
            // key={job.id}
            // job={job}
            // onView={() => handleView(job.id)}
            // onEdit={() => handleEdit(job.id)}
            // onDelete={() => handleDelete(job.id)}
          />
        ))}
      </Box>
    </>
  );
}
