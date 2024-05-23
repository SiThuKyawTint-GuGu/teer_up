"use client";
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from "@mui/material";

import CustomPopover, { usePopover } from "@/components/ui/CustomPopover";
import { CompanyOpportunity } from "@/types/CompanyOpportunity";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Link from "next/link";

export default function OpportunitiyCard({ id, location, content }: CompanyOpportunity) {
  const popover = usePopover();

  return (
    <>
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
          <Link href={`/school/opportunities/${id}`}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {content.title}
            </Typography>
          </Link>

          <Typography variant="body1" sx={{ fontWeight: "normal", mt: 1 }}>
            {content.description}
          </Typography>

          <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ mt: 3 }}>
            {[
              {
                label: location,
                icon: <LocationOnIcon width={32} sx={{ flexShrink: 0 }} />,
              },
              {
                label: content.type,
                icon: <WorkOutlineIcon width={16} sx={{ flexShrink: 0 }} />,
              },
              {
                label: id,
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
              label: "1224",
              icon: <VisibilityIcon width={16} sx={{ flexShrink: 0 }} />,
            },
            {
              label: "3456",
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
