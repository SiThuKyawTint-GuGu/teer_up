"use client";
import { Badge, Box, Button, Container, Divider, Drawer, Pagination, Stack, Typography } from "@mui/material";

import { CompanyOpportunityResponse } from "@/types/CompanyOpportunity";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import OpportunitiyCard from "./OpportunitiyCard";

export default function OpportunityList({ data }: CompanyOpportunityResponse) {
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
          marginTop={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight={"bold"}>
              All opportunities
            </Typography>
            <Typography variant="caption">1 - {data.length} of many results</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              disableRipple
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#03a9f4", textTransform: "none" }}
              endIcon={
                <Badge>
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
        gap={2}
        marginTop={2}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {data.map(job => (
          <OpportunitiyCard key={job.id} {...job} />
        ))}
      </Box>
      {data.length >= 8 ? (
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
