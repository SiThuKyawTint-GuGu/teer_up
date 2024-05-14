"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { SchoolAdminResponse, ParamsType, SchoolAdmin } from "@/types/School";

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useCreateSchool, useGetSchoolAdmins } from "@/services/school";
import { USER_ROLE } from "@/shared/enums";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email").required("Email is required!"),
  degrees: yup.array().of(
    yup.object({
      name: yup.string().required("Degree name is required!"),
    })
  ),
  school_admin_id: yup.number().required("School admin is required!"),
});

interface SchoolDetailsProps {
  id: string;
}

export default function SchoolDetails({ id }: SchoolDetailsProps) {
  const router = useRouter();
  const {
    data: schoolAdmins,
    error,
    isValidating,
    mutate,
  } = useGetSchoolAdmins<ParamsType, SchoolAdminResponse>({ page: 1, pageSize: 10, role: USER_ROLE.SCHOOL });
  const { trigger: createSchool, data, error: createError, isMutating: creatingSchool } = useCreateSchool();

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
    createSchool(data);
    router.push("/admin/schools");
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        marginTop: 8,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField type="text" label="Name" {...register("name")} fullWidth />
        <Typography variant="body2" color="red">
          {errors.name?.message}
        </Typography>
        <TextField
          type="email"
          label="Email"
          {...register("email")}
          fullWidth
          sx={{
            marginTop: 2,
          }}
        />
        <Typography variant="body2" color="red">
          {errors.email?.message}
        </Typography>
        {/* <TextField
          type="number"
          placeholder="School Admin ID"
          {...register("school_admin_id")}
          fullWidth
          sx={{
            marginTop: 2,
          }}
        /> */}
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Controller
            name="school_admin_id"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={schoolAdmins?.data || []}
                getOptionLabel={(option: SchoolAdmin) => option.email}
                onChange={(_, data) => field.onChange(data?.id)}
                fullWidth
                renderInput={params => <TextField {...params} label="Choose School Admin" />}
              />
            )}
          />
        </Box>

        <Typography variant="body2" color="red">
          {errors.school_admin_id?.message}
        </Typography>

        <Controller
          name="degrees"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <DegreeSelector
              value={field.value ? field.value.map(degree => degree.name) : []}
              onChange={degreeNames => field.onChange(degreeNames.map(name => ({ name })))}
            />
          )}
        />
        <Typography variant="body2" color="red">
          {errors.degrees?.message}
        </Typography>
        <LoadingButton loading={isSubmitting || creatingSchool} variant="contained" type="submit">
          Submit
        </LoadingButton>
      </form>
    </Container>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Bachelor Degree", "Master Degree", "Doctorate Degree"];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

interface DegreeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function DegreeSelector({ value, onChange }: DegreeSelectorProps) {
  const theme = useTheme();
  const [degreeName, setDegreeName] = React.useState<string[]>(value);
  const handleChange = (event: SelectChangeEvent<typeof degreeName>) => {
    const {
      target: { value: nextDegreeName },
    } = event;
    setDegreeName(typeof nextDegreeName === "string" ? nextDegreeName.split(",") : nextDegreeName);

    onChange(typeof nextDegreeName === "string" ? nextDegreeName.split(",") : nextDegreeName);
  };

  return (
    <div>
      <FormControl sx={{ marginY: 2 }} fullWidth>
        <InputLabel id="school-degrees">Degree</InputLabel>
        <Select
          labelId="school-degrees"
          id="school-degrees-select"
          multiple
          value={degreeName}
          onChange={handleChange}
          input={<OutlinedInput id="degree-chip" label="Degree" />}
          renderValue={selected => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, degreeName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
