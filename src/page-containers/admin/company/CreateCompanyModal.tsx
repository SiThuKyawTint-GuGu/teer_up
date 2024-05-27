"use client";

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
import { useCreateCompany } from "@/services/company";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  company_admin_id: yup.number().integer().positive().optional(),
});

function CreateCompanyModal() {
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
      email: "",
      // courses: [{ name: "", credit: 0 }],
    },
  });

  const { trigger: createCompany, data, isMutating } = useCreateCompany();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    createCompany(data, {
      onSuccess: data1 => {
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
        Add Company
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ padding: 2, borderRadius: 2 }}
        maxWidth="sm" // Set maximum width
        fullWidth // Ensure full width
      >
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type="text" label="Company Name" {...register("name")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.name?.message}
            </Typography>

            <TextField type="text" label="Email" {...register("email")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.email?.message}
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

export default CreateCompanyModal;
