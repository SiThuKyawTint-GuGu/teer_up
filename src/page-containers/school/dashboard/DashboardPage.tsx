"use client";
import { Container, Box, Card, CardHeader, CardContent, Typography } from "@mui/material";
import ChartLine from "@/page-containers/school/dashboard/ChartLine";

export default function DashboardPage() {
  return (
    <Container sx={{ mb: 10, maxWidth: "lg" }}>
      <Typography variant="h6" fontWeight="bold" my={4}>
        Dashboard
      </Typography>
      <Box gap={3} display="grid" gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
        <Card>
          <CardHeader title="Number of Opportunities" />
          <CardContent>
            <ChartLine
              series={[
                {
                  name: "Opportunities",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Number of Successful Applications" />
          <CardContent>
            <ChartLine
              series={[
                {
                  name: "Applications",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                },
              ]}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
