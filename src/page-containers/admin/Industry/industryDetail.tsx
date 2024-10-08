"use client";
import { useGetDepartment } from "@/services/department";
import { useCreateIndustry, useGetIndustryById, useUpdateIndustry, useUpdateJoinDepartment } from "@/services/industry";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {
  id: string;
}

interface OptionType {
  label: string;
  id: number;
}

const validationSchema = yup.object({
  name: yup.string().required("Question is required!"),
  status: yup.string().required("Status is required!"),
});

const IndustryDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: createTrigger, isMutating: postMutating, error: createError } = useCreateIndustry();
  const { trigger: updateTrigger, isMutating: updateMutating, error: updateError } = useUpdateIndustry();
  const { trigger: updateJoinDepartment } = useUpdateJoinDepartment();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { data: departments } = useGetDepartment<any>();
  const { data: industry } = useGetIndustryById<any>(id);
  const [selectedDepartment, setSelectedDepartment] = useState<OptionType[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<OptionType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (departments?.data) {
      const updatedOptions = departments?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setDepartmentOptions(updatedOptions);
    }
    if (industry?.data) {
      setName(industry?.data.name);
      const status = industry?.data.is_published === true ? "published" : "unpublished";
      setSelectedStatus(status);
      setValue("name", industry?.data.name);
      setValue("status", industry?.data.is_published);
      const updatedOptions = industry?.data.departments.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setSelectedDepartment(updatedOptions);
    }
  }, [departments?.data, industry?.data]);

  const Submit = async (data: any) => {
    const options = selectedDepartment.map(dep => dep.id);
    if (options.length <= 0) {
      setError("Department is required!");
      return;
    }
    const joinData = {
      departments: options,
      industry_id: industry?.data.id,
    };
    const status = selectedStatus === "published" ? true : false;
    if (industry?.data) {
      await updateJoinDepartment(joinData);
      await updateTrigger({ id, name: data?.name, departments: options, is_published: status });
    } else {
      await createTrigger({ name: data?.name, departments: options, is_published: status });
    }
    router.push("/admin/configs/industry");
  };

  const handleDepartmentChange = (event: any, newValue: any) => {
    setSelectedDepartment(newValue);
  };

  const handleSelectStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(Submit)} className="h-full p-5">
        {createError && (
          <Alert sx={{ marginBottom: "20px", width: "60%", marginLeft: "12px" }} severity="error">
            {createError.response.data.error}
          </Alert>
        )}
        {updateError && (
          <Alert sx={{ marginBottom: "20px", width: "60%", marginLeft: "12px" }} severity="error">
            {updateError.response.data.error}
          </Alert>
        )}
        <div className="mb-10">
          {name ? (
            <TextField
              InputLabelProps={{ shrink: !!name }}
              {...register("name")}
              label="Name"
              id="name"
              defaultValue={name}
              className="w-full"
              variant="outlined"
            />
          ) : (
            <TextField
              {...register("name")}
              label="Name"
              id="name"
              defaultValue={name}
              className="w-full"
              variant="outlined"
            />
          )}
          <p className="mt-2 text-red-700">{errors.name?.message}</p>
        </div>
        <div className="mb-10">
          <FormControl fullWidth>
            <InputLabel id="selectStatus">Status</InputLabel>
            <Select
              {...register("status")}
              labelId="selectStatus"
              id="selectStatus"
              value={selectedStatus}
              label="Status"
              onChange={handleSelectStatus}
            >
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="unpublished">Unpublished</MenuItem>
            </Select>
          </FormControl>
          <p className="mt-2 text-red-700">{errors.status?.message}</p>
        </div>

        <div className="my-10">
          <Autocomplete
            multiple
            id="tags-outlined"
            options={departmentOptions || []}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            renderInput={params => <TextField {...params} label="Departments" placeholder="Departments" />}
          />
          {error && <p className="mt-2 text-red-700">{error}</p>}
        </div>

        <div className="flex justify-between">
          <div></div>
          <div>
            {industry?.data ? (
              <LoadingButton
                loading={updateMutating}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                color="error"
              >
                Update
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={postMutating}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                color="error"
              >
                Save
              </LoadingButton>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default IndustryDetail;
