"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Card,
  Chip,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { createFilterOptions } from "@mui/material/Autocomplete";
import * as React from "react";
import { useCreateDegree, useGetDegreeBySchoolId, useGetSchools } from "@/services/school";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { majors } from "./majors";
import toast from "react-hot-toast";
import { DegreeResponse, GetAllSchoolsResponse } from "@/types/School";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  school_id: yup.string().required("School is required!"),
  majors: yup.array().of(
    yup.object({
      name: yup.string().required("Major name is required!"),
    })
  ),
});

export default function CreateDegreeModal() {
  const router = useRouter();

  const { trigger: createDegree, data, error: createError, isMutating: creatingDegree } = useCreateDegree();
  const { data: schools } = useGetSchools<GetAllSchoolsResponse>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    createDegree(data, {
      onSuccess: data => {
        toast.success("Degree created successfully");
        handleClose();
      },
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Degree
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Degree</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type="text" label="Name" {...register("name")} fullWidth margin="normal" />
            <Typography variant="body2" color="red">
              {errors.name?.message}
            </Typography>

            <FormControl
              fullWidth
              sx={{
                marginTop: 2,
              }}
            >
              <InputLabel id="school-id-degree">School</InputLabel>
              <Select fullWidth labelId="school-id-degree" {...register("school_id")} label="School">
                {schools?.data.map(school => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box my={4}>
              <Controller
                name="majors"
                control={control}
                render={({ field: { onChange, value } }) => <Majors onChange={onChange} value={value} />}
              />
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton loading={isSubmitting || creatingDegree} variant="contained" type="submit">
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface DegreeOptionType {
  inputValue?: string;
  name: string;
}

interface MajorsProps {
  value: DegreeOptionType[] | undefined;
  onChange: (value: DegreeOptionType[] | undefined) => void;
}

const filter = createFilterOptions<DegreeOptionType>();

export function Majors({ value, onChange }: MajorsProps) {
  const [selectedMajors, setSelectedMajors] = React.useState<DegreeOptionType[]>([]);

  const handleSelect = (_event: any, newValue: DegreeOptionType[] | undefined) => {
    const names = newValue?.map(option => option.name.replace('Add "', "").replace('"', "")) || [];
    const nameObjects = names.map(name => ({ name }));
    setSelectedMajors(newValue || []);
    onChange(nameObjects); // Update form value
  };

  return (
    <Autocomplete
      fullWidth
      multiple
      limitTags={3}
      options={majors}
      getOptionLabel={(
        option:
          | {
              name: string;
              inputValue?: string;
            }
          | DegreeOptionType
      ) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      defaultValue={majors.slice(0, 8)}
      value={selectedMajors} // Set the value from the state
      onChange={handleSelect}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(option => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderInput={params => <TextField {...params} label="Add Majors" placeholder="Majors" />}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip {...getTagProps({ index })} key={index} label={option.name} size="small" />
        ))
      }
    />
  );
}
