"use client";
import { Badge, Box, Button, Container, Divider, Drawer, Pagination, Stack, Typography } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import OpportunitiyCard from "./OpportunitiyCard";
import { useState } from "react";
import { jobs } from "./staticData";

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

export default function OpportunityList() {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ maxWidth: "lg" }}>
      <Box>
        <Typography variant="h6" fontWeight="bold">
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
            <Typography variant="body1" fontWeight={"medium"}>
              All opportunities
            </Typography>
            <Typography variant="body2">1 - {jobs.length} of many results</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              disableRipple
              color="inherit"
              endIcon={
                <Badge color="error" variant="dot">
                  <FilterListIcon />
                </Badge>
              }
              onClick={onOpen}
            >
              Filters
            </Button>
            <Drawer
              anchor="right"
              open={open}
              onClose={onClose}
              slotProps={{
                backdrop: { invisible: true },
              }}
              PaperProps={{
                sx: { width: 280 },
              }}
            >
              {/* {renderHead} */}

              <Divider />

              <Box sx={{ px: 2.5, py: 3 }}>
                <Stack spacing={3}>Filters</Stack>
              </Box>
            </Drawer>
          </Box>
        </Stack>
      </Box>
      <Box
        gap={3}
        marginTop={4}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {jobs.map(job => (
          <OpportunitiyCard key={job.id} {...job} />
        ))}
      </Box>
      {jobs.length >= 8 ? (
        <Stack>
          <Pagination
            count={10}
            color="primary"
            sx={{
              mt: 4,
              justifyContent: "center",
              mx: "auto",
            }}
          />
        </Stack>
      ) : null}
    </Container>
  );
}
