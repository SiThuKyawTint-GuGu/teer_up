import DegreeForm from "@/page-containers/admin/schools/degreeForm";
import DegreeTable from "@/page-containers/admin/schools/degreeTable";
import SchoolDetails from "@/page-containers/admin/schools/schoolDetails";
import { Box, Container } from "@mui/material";

interface Props {
  params: {
    id: string;
    degreeId: string;
  };
}
const SchoolDetailPage = ({ params: { id, degreeId } }: Props) => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        paddingY: 6,
      }}
    >
      {id === "0" ? <SchoolDetails id={id} /> : null}

      {/* degree */}
      {id !== "0" ? (
        <Box my={4}>
          <DegreeTable id={id} degreeId={degreeId} />
        </Box>
      ) : null}

      <Box my={4}>
        <DegreeForm id={id} />
      </Box>
    </Container>
  );
};

export default SchoolDetailPage;
