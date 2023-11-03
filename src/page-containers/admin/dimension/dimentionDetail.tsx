"use client";
import { ParamsType, useGetContent } from "@/services/content";
import { useCreateDimension, useGetDimensionById, useUpdateDimension } from "@/services/dimension";
import { ContentType } from "@/types/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Question is required!"),
  short_name: yup.string().required("Short name is required!"),
});

interface OptionType {
  label: string;
  content_id: number;
}

const DimensionDetailPage = ({ id }: Props) => {
  const router = useRouter();
  const [searchContent, setSearchContent] = useState<string>("");
  const [contentOptions, setContentOptions] = useState<OptionType[]>([]);
  const [selectedContent, setSelectedContent] = useState<any>();
  const { data: dimension } = useGetDimensionById<any>(id);
  const { data: contents } = useGetContent<ParamsType, ContentType>({
    page: 1,
    pagesize: 10,
    search: searchContent,
    type: "pathway",
  });
  // console.log("contents ", contents);
  const { trigger: createTrigger, isMutating: postMutating } = useCreateDimension();
  const { trigger: updateTrigger, isMutating: updateMutating } = useUpdateDimension();
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [medium, setMedium] = useState<string>("");

  useEffect(() => {
    if (contents?.data && contents?.data.length > 0) {
      const updatedOptions = contents?.data.map((option: any) => ({
        label: option.title ? option.title : "",
        content_id: option.id,
      }));
      setContentOptions(updatedOptions);
    }
    if (dimension?.data) {
      setValue("name", dimension?.data.name ?? "");
      setValue("short_name", dimension?.data.short_name);
      setHigh(dimension?.data?.high_body);
      setMedium(dimension?.data.medium_body);
      setLow(dimension?.data.low_body);
      const content: any = contents?.data.find((content: any) => content.id === dimension?.data.content_id);
      if (content) {
        const data = { label: content.title, content_id: content.id };
        setSelectedContent(data);
      }
    }
  }, [dimension?.data, contents?.data]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleInputChange = (event: any) => {
    setSearchContent(event?.target.value);
  };

  const handleSelectPathwayChange = (event: any, newValue: any) => {
    setSelectedContent(newValue);
  };

  const Submit = async (data: any) => {
    const submitData: any = {
      name: data?.name,
      short_name: data?.short_name,
      content_id: selectedContent?.content_id,
      high_body: high,
      low_body: low,
      medium_body: medium,
    };
    if (dimension?.data) {
      submitData.id = id;
      await updateTrigger(submitData);
    } else {
      await createTrigger(submitData);
    }
    router.push("/admin/setting/dimension");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(Submit)} className="bg-white h-full p-5">
        <div className="mb-10">
          <TextField
            InputLabelProps={{ shrink: !!watch("name") }}
            {...register("name")}
            name="name"
            multiline
            label="Name"
            className="w-full"
            variant="outlined"
          />
          <p className="mt-2 text-red-700">{errors.name?.message}</p>
        </div>
        <div className="mb-10">
          <TextField
            InputLabelProps={{ shrink: !!watch("short_name") }}
            {...register("short_name")}
            label="Short Name"
            className="w-full"
            name="short_name"
            variant="outlined"
          />
          <p className="mt-2 text-red-700">{errors.short_name?.message}</p>
        </div>
        <div className="mb-10">
          <TextField
            value={high}
            multiline
            onChange={e => setHigh(e.target.value)}
            label="High Body"
            name="high_body"
            className="w-full"
            variant="outlined"
          />
        </div>
        <div className="mb-10">
          <TextField
            value={medium}
            multiline
            onChange={e => setMedium(e.target.value)}
            label="Medium Body"
            className="w-full"
            name="medium_body"
            variant="outlined"
          />
        </div>
        <div className="mb-10">
          <TextField
            value={low}
            multiline
            onChange={e => setLow(e.target.value)}
            label="Low Body"
            className="w-full"
            variant="outlined"
            name="low_body"
          />
        </div>
        <div className="mb-10">
          <Autocomplete
            disablePortal
            id="dimension"
            options={contentOptions || []}
            value={selectedContent ? selectedContent : null}
            // onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue)}
            onInputChange={event => handleInputChange(event)}
            onChange={(event, newValue) => handleSelectPathwayChange(event, newValue)}
            renderInput={params => <TextField {...params} label="Pathway" />}
          />
        </div>
        <div className="flex justify-between">
          <div></div>
          <div>
            {dimension?.data ? (
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
    </div>
  );
};

export default DimensionDetailPage;
