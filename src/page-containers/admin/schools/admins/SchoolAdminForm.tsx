"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export default function SchoolAdminForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { trigger: createUser, isMutating: creatingUser } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data: { name: string; email: string; password: string }) => {
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
      <FormControl fullWidth variant="outlined">
        <InputLabel>Password</InputLabel>

        <OutlinedInput
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
      </FormControl>
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
