"use client";
import { GetAllSchoolsResponse } from "@/types/School";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useCreateSchool, useGetSchools } from "@/services/school";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email").required("Email is required!"),
});

interface SchoolDetailsProps {
  id: string;
}

export default function SchoolDetails({ id }: SchoolDetailsProps) {
  const router = useRouter();
  const { mutate: mutateSchools } = useGetSchools<GetAllSchoolsResponse>();

  const { trigger: createSchool, data, error: createError, isMutating: creatingSchool } = useCreateSchool();

  //   validations
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    createSchool(data);
    mutateSchools();
    router.push("/admin/schools");
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
        Add School
      </Typography>
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
            marginY: 2,
          }}
        />
        <Typography variant="body2" color="red">
          {errors.email?.message}
        </Typography>

        {/* <Box
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
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Choose School Admin"
                    helperText="You can create admin under user tab."
                  />
                )}
              />
            )}
          />
        </Box>

        <Typography variant="body2" color="red">
          {errors.school_admin_id?.message}
        </Typography>

        <Controller
          name="majors"
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
          {errors.majors?.message}
        </Typography> */}
        <LoadingButton loading={isSubmitting || creatingSchool} variant="contained" type="submit">
          Submit
        </LoadingButton>
      </form>
    </Card>
  );
}
