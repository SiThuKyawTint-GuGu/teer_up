"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
});

export default function SchoolAdminForm() {
  const router = useRouter();
  const { trigger: createUser, isMutating: creatingUser } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { name: string; email: string }) => {
    const submitData = {
      ...data,
      role: USER_ROLE.SCHOOL,
    };
    createUser(submitData, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        maxWidth: "600px",
        m: 2,
      }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" fontWeight="bold">
        Add School Admin
      </Typography>
      <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} fullWidth />
      <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
      <Box>
        <LoadingButton type="submit" loading={isSubmitting || creatingUser} variant="contained">
          Submit
        </LoadingButton>
        <Button
          variant="outlined"
          sx={{
            ml: 2,
          }}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
