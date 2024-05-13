"use client";
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Job } from "./OpportunityList";
import Link from "next/link";
import CustomPopover, { usePopover } from "@/components/ui/CustomPopover";

export default function OpportunitiyCard({ id, name, description, location, jobType, jobID, Views, Saved }: Job) {
  const popover = usePopover();

  return (
    <>
      {/* <Link href={`/school/opportunities/${id}`}> */}
      <Card
        color="#FAFAFA"
        sx={{
          backgroundColor: "#FAFAFA",
          position: "relative",
          padding: 1,
        }}
      >
        <IconButton onClick={popover.onOpen} sx={{ position: "absolute", top: 8, right: 8 }}>
          <MoreVertIcon width={16} sx={{ flexShrink: 0 }} />
        </IconButton>

        <Stack sx={{ p: 2, pb: 2 }}>
          {/* <Avatar alt={company.name} src={company.logo} variant="rounded" sx={{ width: 48, height: 48, mb: 2 }} /> */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "normal", mt: 1 }}>
            {description}
          </Typography>

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ mt: 3 }}>
            {[
              {
                label: location,
                icon: <LocationOnIcon width={32} sx={{ flexShrink: 0 }} />,
              },
              {
                label: jobType,
                icon: <WorkOutlineIcon width={16} sx={{ flexShrink: 0 }} />,
              },
              {
                label: jobID,
                icon: <DescriptionIcon width={16} sx={{ flexShrink: 0 }} />,
              },
            ].map((item, index) => (
              <Stack key={index} spacing={2} flexShrink={0} direction="row" alignItems="center" sx={{ minWidth: 0 }}>
                {item.icon}
                <Typography variant="body2" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box rowGap={3} sx={{ p: 3 }} display="flex" gap={3}>
          {[
            {
              label: Views,
              icon: <VisibilityIcon width={16} sx={{ flexShrink: 0 }} />,
            },
            {
              label: Saved,
              icon: <BookmarkBorderIcon width={16} sx={{ flexShrink: 0 }} />,
            },
          ].map((item, index) => (
            <Stack
              key={index}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              justifyContent="start"
              sx={{ minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="body1" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>
      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            popover.onClose();
            // onView();
          }}
        >
          <VisibilityIcon />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            // onEdit();
          }}
        >
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            // onDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
