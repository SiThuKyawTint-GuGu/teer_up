"use client";

import { useCreateEducationLevel, useGetMajors } from "@/services/school";
import { AllMajorResponse } from "@/types/Majors";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const educationLevelSchema = yup.object().shape({
  name: yup.string().required("Education level name is required"),
  major_id: yup.number().integer().positive().required("Major is required"),
});

function CreateEducationLevelModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(educationLevelSchema),
    defaultValues: {
      name: "",
      major_id: 0,
    },
  });
  const { trigger: createEducationLevel, isMutating } = useCreateEducationLevel();
  const { data: majors } = useGetMajors<AllMajorResponse>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    createEducationLevel(data, {
      onSuccess: () => {
        toast.success("Successfully created");
        handleClose();
      },
      onError: err => {
        console.log(err);
        toast.error(err.response.data.message);
      },
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width
        fullWidth // Ensure full width
      >
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type="text" label="Course Name" {...register("name")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.name?.message}
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="major-id">Major</InputLabel>
              <Select labelId="major-id" {...register("major_id")} label="Major">
                {majors?.data.map(major => (
                  <MenuItem key={major.id} value={major.id}>
                    {major.name + " - " + major.degree.name + " - " + major.degree.school.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Combination: Major Name + Degree Name + University Name</FormHelperText>
            </FormControl>
            <Typography variant="body2" color="red">
              {errors.major_id?.message}
            </Typography>

            <DialogActions sx={{ marginTop: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton loading={isSubmitting || isMutating} type="submit" variant="contained" color="primary">
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateEducationLevelModal;
