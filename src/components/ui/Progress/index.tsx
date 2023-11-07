import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";

interface Props {
  progress: number;
}
const ProgressBar = ({ progress }: Props) => {
  return (
    <>
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    </>
  );
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ProgressBar;
