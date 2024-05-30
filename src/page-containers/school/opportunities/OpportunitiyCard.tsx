"use client";
import { Box, Card, Divider, IconButton, MenuItem, Stack, Typography } from "@mui/material";

import CustomPopover, { usePopover } from "@/components/ui/CustomPopover";
import { CompanyOpportunity } from "@/types/CompanyOpportunity";
import { truncateString } from "@/utils/helper";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OpportunitiyCard({ id, location, content, location_type }: CompanyOpportunity) {
  const pathname = usePathname();
  const popover = usePopover();

  return (
    <>
      <Card
        color="#FAFAFA"
        sx={{
          backgroundColor: "#FAFAFA",
          position: "relative",
          padding: 2,
        }}
        variant="outlined"
      >
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Link href={`${pathname}/${id}`}>
              <Typography variant="body1" fontWeight={"bold"}>
                {truncateString(content.title, 18)}
              </Typography>
            </Link>
            <IconButton onClick={popover.onOpen} sx={{ margin: 0, padding: 0 }}>
              <MoreVertIcon sx={{ flexShrink: 0, width: 20 }} />
            </IconButton>
          </Stack>

          <Typography variant="caption">{truncateString(content.description, 40)}</Typography>

          <Box rowGap={1} display="grid" gridTemplateColumns="repeat(1, 1fr)">
            {[
              {
                label: location,
                icon: <LocationOnIcon sx={{ flexShrink: 0, width: 20 }} />,
              },
              {
                label: location_type,
                icon: <WorkOutlineIcon width={10} sx={{ flexShrink: 0, width: 20 }} />,
              },
              {
                label: id,
                icon: <DescriptionIcon width={10} sx={{ flexShrink: 0, width: 20 }} />,
              },
            ].map((item, index) => (
              <Stack key={index} spacing={1} flexShrink={0} direction="row" alignItems="center" sx={{ minWidth: 0 }}>
                {item.icon}
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box rowGap={3} display="flex" gap={3}>
          {[
            {
              label: "1224",
              icon: <VisibilityIcon sx={{ flexShrink: 0, width: 20 }} />,
            },
            {
              label: "3456",
              icon: <BookmarkBorderIcon sx={{ flexShrink: 0, width: 20 }} />,
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
              <Typography variant="caption" noWrap>
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
