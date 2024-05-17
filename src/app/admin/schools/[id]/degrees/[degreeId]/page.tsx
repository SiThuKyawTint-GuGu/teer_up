
import { Box, Container } from "@mui/material";
import * as yup from "yup"
import MajorForm from "@/page-containers/admin/schools/majorForm";

const validationSchema = yup.object({

})



interface Props {
  params: { id: string, degreeId: string };
}
const DegreeForm = ({ params: { id, degreeId } }: Props) => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        paddingY: 6,
      }}
    >
      <MajorForm id={degreeId}/>
    </Container>
  );
};

export default DegreeForm;
