"use client";

import { useGetSchools } from "@/services/school";
import { useCreateStudentGroup } from "@/services/school/studentGroup";
import { GetAllSchoolsResponse } from "@/types/School";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const studentGroupSchema = yup.object().shape({
  name: yup.string().required("Student Group name is required"),
});

function CreateStudentGroupModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(studentGroupSchema),
    defaultValues: {
      name: "",
    },
  });
  const { trigger: createStudentGroup, isMutating } = useCreateStudentGroup();
  const { data: schools } = useGetSchools<GetAllSchoolsResponse>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    createStudentGroup(data, {
      onSuccess: () => {
        toast.success("Successfully created");
        reset();
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
      <Button size={"small"} variant="contained" onClick={handleClickOpen}>
        Add Student Group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width
        fullWidth // Ensure full width
      >
        <DialogTitle>Add Student Group</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type="text" label="Student Group Name" {...register("name")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.name?.message}
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

export default CreateStudentGroupModal;
