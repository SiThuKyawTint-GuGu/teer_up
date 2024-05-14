"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Card, Chip, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { createFilterOptions } from "@mui/material/Autocomplete";
import * as React from "react";
import { useCreateDegree } from "@/services/school";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { majors } from "./majors";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  //   school_id: yup.number().required("School ID is required!"),
  majors: yup.array().of(
    yup.object({
      name: yup.string().required("Major name is required!"),
    })
  ),
});

interface SchoolDetailsProps {
  id: string;
}

export default function DegreeForm({ id }: SchoolDetailsProps) {
  const router = useRouter();

  const { trigger: createDegree, data, error: createError, isMutating: creatingDegree } = useCreateDegree();

  //   validations
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

  const onSubmit = async (data: any) => {
    const submitData = {
      ...data,
      school_id: id,
    };
    createDegree(submitData);
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" my={2}>
        Add Degree
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField type="text" label="Name" {...register("name")} fullWidth />
        <Typography variant="body2" color="red">
          {errors.name?.message}
        </Typography>

        <Box my={4}>
          <Controller
            name="majors"
            control={control}
            render={({ field: { onChange, value } }) => <Majors onChange={onChange} value={value} />}
          />
        </Box>

        <LoadingButton loading={isSubmitting || creatingDegree} variant="contained" type="submit">
          Submit
        </LoadingButton>
      </form>
    </Card>
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
      renderInput={params => <TextField {...params} label="Add Degrees" placeholder="Favorites" />}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip {...getTagProps({ index })} key={index} label={option.name} size="small" />
        ))
      }
    />
  );
}
