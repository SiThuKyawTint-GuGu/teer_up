import DegreeForm from "@/page-containers/admin/schools/degreeForm";
import DegreeTable from "@/page-containers/admin/schools/degreeTable";
import SchoolDetails from "@/page-containers/admin/schools/schoolDetails";
import { Box, Container } from "@mui/material";

interface Props {
  params: { id: string };
}
const SchoolDetailPage = ({ params: { id } }: Props) => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        marginY: 8,
      }}
    >
      <SchoolDetails id={id} />

      {/* degree */}
      <Box my={4}>
        <DegreeTable id={id} />
      </Box>

      <Box my={4}>
        <DegreeForm id={id} />
      </Box>
    </Container>
  );
};

export default SchoolDetailPage;
