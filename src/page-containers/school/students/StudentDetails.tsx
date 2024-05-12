import {Box, Button, Chip, Stack, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

export const StudentDetails = () => {
  return (
    <Stack padding={2}>
      <Box
        sx={{
          height: 200,
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
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
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
                Student Name
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "90%",
                left: "10%",
                transform: "translate(-50%, -50%)",
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundImage: "url('https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_4.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "3px solid white",
                zIndex: 2,
              }}
            />
            <Box rowGap={1.5} sx={{ mt: 3 }}>
              {[
                {
                  label: "Full Time Student",
                  icon: <WorkOutlineIcon width={16} sx={{ flexShrink: 0 }} />,
                },
                {
                  label: "Major: Computer Science",
                  icon: <DescriptionIcon width={32} sx={{ flexShrink: 0 }} />,
                },

                {
                  label: "Skills : Programming, Data Analysis",
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
                borderRadius: 2,
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>

    {/*  Personal Info */}
      <Box marginTop={8} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
        <Box display={"flex"} columnGap={1}>
          <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />

          <Typography>John Doe</Typography>
        </Box>
        <Box display={"flex"} columnGap={1}>
          <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />

          <Typography>Male</Typography>
        </Box>
        <Box display={"flex"} columnGap={1}>
          <Image src="/uploads/icons/mail-outline.svg" width={16} height={16} alt="personal profile" />

          <Typography>john@viabells.com</Typography>
        </Box>
        <Box display={"flex"} columnGap={1}>
          <Image src="/uploads/icons/personal-profile.svg" width={16} height={16} alt="personal profile" />
          <Typography>+959 771540032</Typography>
        </Box>
      </Box>
      <Box marginTop={4}>
        <Typography variant="h6" fontWeight="bold">Personal Information</Typography>

        <Typography>
          Lorem ipsum dolor sit amet consectetur. Risus nibh risus at scelerisque nisi natoque. Semper laoreet vitae sed varius quam ultrices laoreet pharetra. Aliquam dolor enim ultricies vitae quis sed. Mi massa pellentesque felis ultrices nulla neque. Leo duis nullam fusce condimentum tortor laoreet. Cursus et nisi vel lectus malesuada amet lacus. Rhoncus leo tellus diam libero sit faucibus accumsan elementum.
          Ut turpis consequat integer placerat cras amet molestie. Placerat rhoncus tincidunt viverra sed lorem lacus imperdiet et. Ac proin ante vitae blandit. Sapien lectus viverra a in sit nunc. Consequat convallis molestie at cursus. Varius sit cursus eu id volutpat sit in venenatis sit. Et porta egestas quam at nulla.

        </Typography>
      </Box>

      {/* edu & exp */}
      <Box marginTop={4} display="grid" gridTemplateColumns="repeat(2, 1fr)">
        {/*  edu */}
        <Box display="flex" flexDirection="column" rowGap={1}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Education</Typography>
          <Box display="flex" gap={1}>

            <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
            <Box>
              <Typography variant="body1" fontWeight="bold">Bachelors of Science</Typography>
              <Typography variant="body1" fontWeight="body1">Harvard University</Typography>
            </Box>
            <Typography variant="body1" fontWeight="body1" justifyContent="end" align="right">2021 - present</Typography>
          </Box>

          <Box display="flex" gap={1}>

            <Image src="/uploads/icons/education.svg" width={42} height={42} alt="education" />
            <Box>
              <Typography variant="body1" fontWeight="bold">Bachelors of Science</Typography>
              <Typography variant="body1" fontWeight="body1">Harvard University</Typography>
            </Box>
          </Box>
        </Box>
        {/*  exp */}
        <Box display="flex" flexDirection="column" rowGap={1}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Experience</Typography>
          <Box display="flex" gap={1}>

            <Image src="/uploads/icons/experience.svg" width={42} height={42} alt="experience" />
            <Box>
              <Typography variant="body1" fontWeight="bold">Software Engineer</Typography>
              <Typography variant="body1" fontWeight="body1">Viabells</Typography>
            </Box>
            <Typography variant="body1" fontWeight="body1" justifyContent="end" align="right">2021 - present</Typography>
          </Box>

          <Box display="flex" gap={1}>

            <Image src="/uploads/icons/experience.svg" width={42} height={42} alt="experience" />
            <Box>
              <Typography variant="body1" fontWeight="bold">Software Engineer</Typography>
              <Typography variant="body1" fontWeight="body1">Viabells</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* career & industry interests */}
      <Box marginTop={4} display="grid" gridTemplateColumns="repeat(2, 1fr)" columnGap={2}>
        {/*  career */}
        <Stack>
          <Typography variant="h6" fontWeight="bold" marginTop={4} marginBottom={2}>Career Interest</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {
              Array(5).fill(null).map((_, index) => (
                <Chip key={index} label="Software Engineering" sx={{
                  backgroundColor: '#F9E9EB',
                  border: "1px solid #EAA1A6"
                }} />
              ))
            }
          </Box>
        </Stack>
        {/*  interests */}
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Stack>
            <Typography variant="h6" fontWeight="bold" marginTop={4} marginBottom={2}>Industry Interest</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {
                Array(5).fill(null).map((_, index) => (
                  <Chip key={index} label="Software Engineering" sx={{
                    backgroundColor: '#F9E9EB',
                    border: "1px solid #EAA1A6"
                  }} />
                ))
              }
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box marginTop={4}>
        <Typography variant="h6" fontWeight="bold">Uploaded Resume</Typography>
      </Box>
    </Stack>
  )
}