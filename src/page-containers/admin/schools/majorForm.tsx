"use client";

import React, { useEffect } from "react";
import { Card, TextField, Typography, Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateMajor } from "@/services/school";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";

const courseSchema = yup.object().shape({
  name: yup.string().required('Course name is required'),
  credit: yup.number().integer().positive().required('Course credit is required')
});

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  degree_id: yup.number().integer().positive().required('Degree ID is required'),
  courses: yup.array().of(courseSchema).min(1, 'At least one course is required')
});

interface MajorFormProps {
  id: string;
}

function MajorForm({ id }: MajorFormProps) {
  const router = useRouter()
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
      degree_id: parseInt(id),
      courses: [{ name: "", credit: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses"
  });

  useEffect(() => {
    setValue("degree_id", parseInt(id));
  }, [id, setValue]);

  const {trigger: createMajor, data, isMutating} = useCreateMajor()

  const onSubmit = (data: any) => {
    createMajor(data, {
      onSuccess: data1 => router.push('/admin/schools')
    })
  };

  return (
    <>
      <Card
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" my={2}>
          Add Major
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            label="Name"
            {...register("name")}
            fullWidth
            margin="normal"
          />
          <Typography variant="body2" color="red">
            {errors.name?.message}
          </Typography>

          {fields.map((item, index) => (
            <Card key={item.id} sx={{ padding: 2, marginBottom: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Course Name"
                    {...register(`courses.${index}.name`)}
                    fullWidth
                    margin="normal"
                  />
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                    sx={{ marginTop: 2 }}
                  >
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

          <LoadingButton
            loading={isSubmitting || isMutating}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </LoadingButton>
        </form>
      </Card>
    </>
  );
}

export default MajorForm;
