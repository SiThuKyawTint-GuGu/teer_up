"use client";
import { Badge, Box, Button, Pagination, Stack, Typography } from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%", padding: 0 }}>
      <Typography fontWeight="700" fontSize="32px">
        Opportunities
      </Typography>
      <Stack display="flex" direction="row" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="10px">
          <Typography fontWeight="700" fontSize="20px">
            All opportunities
          </Typography>
          <Typography fontSize="12px" fontWeight="400">
            1 - {data.length} of many results
          </Typography>
        </Box>
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
        {/* <Drawer
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
              <Divider />

              <Box sx={{ px: 2.5, py: 3 }}>
                <Stack spacing={3}>Filters</Stack>
              </Box>
            </Drawer> */}
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 0,
            background: "transparent",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
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
        {data.length >= 1 ? (
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
      </Box>
    </Box>
  );
}
