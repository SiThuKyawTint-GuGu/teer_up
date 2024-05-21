"use client";

import { useCreateMajor, useGetDegrees } from "@/services/school";
import { AllDegreeResponse } from "@/types/School";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

// const courseSchema = yup.object().shape({
//   name: yup.string().required("Course name is required"),
//   credit: yup.number().integer().positive().required("Course credit is required"),
// });

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  degree_id: yup.number().integer().positive().required("Degree ID is required"),
  // courses: yup.array().of(courseSchema).optional(),
});

function CreateMajorModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      degree_id: 0,
      // courses: [{ name: "", credit: 0 }],
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "courses",
  // });

  const { trigger: createMajor, data, isMutating } = useCreateMajor();
  const { data: degrees } = useGetDegrees<AllDegreeResponse>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    createMajor(data, {
      onSuccess: data1 => {
        toast.success("Successfully created");
        router.push("/admin/schools");
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
        Add Major
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ padding: 2, borderRadius: 2 }}
        maxWidth="sm" // Set maximum width
        fullWidth // Ensure full width
      >
        <DialogTitle>Add Major</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type="text" label="Name" {...register("name")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.name?.message}
            </Typography>

            <FormControl
              fullWidth
              sx={{
                marginY: 2,
              }}
            >
              <InputLabel id="degree-id">Degree</InputLabel>
              <Select fullWidth labelId="degree-id" {...register("degree_id")} label="Degree">
                {degrees?.data.map(degree => (
                  <MenuItem key={degree.id} value={degree.id}>
                    {degree.name + " - " + degree.school.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Combination: Degree Name + University Name</FormHelperText>
            </FormControl>
            {/*
            {fields.map((item, index) => (
              <Card key={item.id} sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Course Name" {...register(`courses.${index}.name`)} fullWidth margin="normal" />
                    <Typography variant="body2" color="red">
                      {errors.courses?.[index]?.name?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Course Credit"
                      type="number"
                      {...register(`courses.${index}.credit`)}
                      fullWidth
                      margin="normal"
                    />
                    <Typography variant="body2" color="red">
                      {errors.courses?.[index]?.credit?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" color="error" onClick={() => remove(index)} sx={{ marginTop: 2 }}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}


            <Button
              variant="outlined"
              onClick={() => append({ name: "", credit: 0 })}
              sx={{ marginTop: 2, marginRight: 2 }}
            >
              Add Course
            </Button>
            */}

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

export default CreateMajorModal;
