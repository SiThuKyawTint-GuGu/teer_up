import { useGetFormConfigById } from "@/services/formConfig";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type Submission = {
  id: number;
  content_id: number;
  formconfig_id: number;
  inputs: Input[];
  created_at: string;
  updated_at: string;
};

type Input = {
  id: number;
  form_id: number;
  inputconfig_id: number;
  created_at: string;
  updated_at: string;
  value: string;
};

interface Props {
  data: Submission[];
}

const SubmissionTable = ({ data }: Props) => {
  // console.log("data....", data);
  const formId = data[0]?.formconfig_id.toString();
  const { data: formconfig } = useGetFormConfigById<any>(formId);
  // console.log("form config...", formconfig);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Form Name</TableCell>
              {formconfig?.data.formdetails_configs.map((form: any, index: number) => (
                <>
                  <TableCell key={index} align="right">
                    {form?.input_config.name}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {formconfig?.data?.name}
                </TableCell>
                {row.inputs.map((input: any, index: number) => (
                  <>
                    <TableCell key={index} align="right">
                      {input.value}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SubmissionTable;
