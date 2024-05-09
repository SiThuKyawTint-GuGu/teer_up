"use client";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Link from "next/link";

export default function OpportunityDetailsPage() {
  return (
    <>
      <Box
        sx={{
          height: 400,
          position: "relative",
          color: "white",
          padding: 4,

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: 0.5,
            // filter: "brightness(0.5)",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <ArrowBackIcon sx={{ flexShrink: 0, width: 32, height: 32 }} />
              <Typography fontSize={40} fontWeight={"bold"}>
                Software Engineer
              </Typography>
            </Box>
            <Box rowGap={1.5} sx={{ mt: 3 }}>
              {[
                {
                  label: "Full Time",
                  icon: <WorkOutlineIcon width={16} sx={{ flexShrink: 0 }} />,
                },
                {
                  label: "1 ~ 10 employees - Technology, Informations and Internet",
                  icon: <DescriptionIcon width={32} sx={{ flexShrink: 0 }} />,
                },

                {
                  label: "Skills : UX Research, UI Design",
                  icon: <DescriptionIcon width={16} sx={{ flexShrink: 0 }} />,
                },
              ].map((item, index) => (
                <Stack key={index} spacing={2} flexShrink={0} direction="row" alignItems="center" sx={{ minWidth: 0 }}>
                  {item.icon}
                  <Typography variant="h6" noWrap>
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="info"
              endIcon={<EditIcon />}
              sx={{
                borderRadius: 4,
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Box>

      <Stack padding={4}>
        <Box marginBottom={4}>
          <Typography fontSize={25} fontWeight={"bold"} marginBottom={4}>
            About this job
          </Typography>

          <Typography variant="body1" fontSize={16}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Typography fontSize={25} fontWeight={"bold"} marginBottom={4}>
            About this company
          </Typography>

          <Typography variant="body1" fontSize={16}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Typography fontSize={25} fontWeight={"bold"} marginBottom={4}>
            Description
          </Typography>

          <Typography variant="body1" fontSize={16}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Typography fontSize={25} fontWeight={"bold"} marginBottom={4}>
            Job Description
          </Typography>

          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>

          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Typography fontSize={25} fontWeight={"bold"} marginBottom={4}>
            Job Requirements
          </Typography>

          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>

          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
          <Typography variant="body1" fontSize={16} marginBottom={2}>
            Lorem ipsum dolor sit amet consectetur. Convallis odio consectetur tempor pharetra sed. Massa fusce mattis
            velit dignissim. Risus arcu eget eget suspendisse cursus laoreet. Viverra phasellus mi elementum orci
            ultrices et nec mi duis. Nunc est risus ornare eget. Maecenas suspendisse nullam.
          </Typography>
        </Box>
      </Stack>

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" marginTop={4} mx={2} columnGap={4}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 4,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={25} fontWeight={"bold"}>
              Applicants
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={"medium"}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              <Link href="/school/applicants">View All Appliants</Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <AvatarGroup total={24} renderSurplus={(surplus: number) => <Avatar>+{surplus}</Avatar>}>
              <Avatar
                alt="Remy Sharp"
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png"
                sizes=""
                sx={{
                  width: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                  height: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                }}
              />
              <Avatar
                alt="Travis Howard"
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png"
                sx={{
                  width: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                  height: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                }}
              />
              <Avatar
                alt="Agnes Walker"
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png"
                sx={{
                  width: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                  height: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_4.png"
                sx={{
                  width: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                  height: {
                    xs: 40,
                    sm: 60,
                    md: 80,
                    lg: 100,
                    xl: 120,
                  },
                }}
              />
            </AvatarGroup>
          </Box>
        </Card>

        <Card
          sx={{
            padding: 4,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Typography variant="h3" fontSize={25} fontWeight={"bold"} marginBottom={6}>
            Related Jobs Categories
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button variant="outlined" color="primary" size="large" sx={buttonStyles}>
              Business
            </Button>
            <Button variant="outlined" sx={buttonStyles}>
              IT
            </Button>
            <Button variant="outlined" sx={buttonStyles}>
              Marketing
            </Button>
            <Button variant="outlined" sx={buttonStyles}>
              Design
            </Button>

            <Button variant="outlined" sx={buttonStyles}>
              Supervising
            </Button>

            <Button variant="outlined" sx={buttonStyles}>
              Management
            </Button>

            <Button variant="outlined" sx={buttonStyles}>
              Sales
            </Button>

            <Button variant="outlined" sx={buttonStyles}>
              Programming
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}

const buttonStyles = {
  color: "black",
  outlineColor: "#FFFFFF",
  borderColor: "gray",
  backgroundColor: "#FFFFFF",
};
