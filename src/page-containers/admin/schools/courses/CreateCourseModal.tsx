"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCourse, useCreateMajor, useGetDegrees, useGetMajors } from "@/services/school";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AllDegreeResponse } from "@/types/School";
import { AllMajorResponse } from "@/types/Majors";

const courseSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  credit: yup.number().integer().positive().required("Course credit is required"),
  major_id: yup.number().integer().positive().required("Degree ID is required"),
});

function CreateCourseModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      name: "",
      credit: 0,
      major_id: 0,
    },
  });
  const { trigger: createCourse, isMutating } = useCreateCourse();
  const { data: majors } = useGetMajors<AllMajorResponse>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    createCourse(data, {
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

            <TextField type="number" label="Course Credit" {...register("credit")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.credit?.message}
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

export default CreateCourseModal;
