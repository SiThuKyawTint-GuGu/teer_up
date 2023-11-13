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
  const [selectedHighContent, setSelectedHighContent] = useState<any>();
  const [selectedMediumContent, setSelectedMediumContent] = useState<any>();
  const [selectedLowContent, setSelectedLowContent] = useState<any>();
  const { data: dimension, mutate } = useGetDimensionById<any>(id);
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
  const [initializeSearch, setInitializeSearch] = useState<boolean>(false);

  useEffect(() => {
    if (initializeSearch === true) {
      if (contents?.data && contents?.data.length > 0) {
        const updatedOptions = contents?.data.map((option: any) => ({
          label: option.title ? option.title : "",
          content_id: option.id,
        }));
        setContentOptions(updatedOptions);
      }
    } else {
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
        if (dimension?.data.high_content_id) {
          setSelectedHighContent({
            label: dimension?.data.high_content?.title,
            content_id: dimension?.data.high_content_id,
          });
        }
        if (dimension?.data.medium_content_id) {
          setSelectedMediumContent({
            label: dimension?.data.medium_content?.title,
            content_id: dimension?.data.medium_content_id,
          });
        }
        if (dimension?.data.low_content_id) {
          setSelectedLowContent({
            label: dimension?.data.low_content?.title,
            content_id: dimension?.data.low_content_id,
          });
        }
      }
    }
  }, [dimension, contents?.data, searchContent]);

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
    setInitializeSearch(true);
    setSearchContent(event?.target.value);
  };

  const handleSelectHighPathwayChange = (event: any, newValue: any) => {
    setSelectedHighContent(newValue);
    setSearchContent("");
  };
  const handleSelectMediumPathwayChange = (event: any, newValue: any) => {
    setSelectedMediumContent(newValue);
    setSearchContent("");
  };
  const handleSelectLowPathwayChange = (event: any, newValue: any) => {
    setSelectedLowContent(newValue);
    setSearchContent("");
  };

  const Submit = async (data: any) => {
    const submitData: any = {
      name: data?.name,
      short_name: data?.short_name,
      high_content_id: selectedHighContent?.content_id,
      medium_content_id: selectedMediumContent?.content_id,
      low_content_id: selectedLowContent?.content_id,
      high_body: high,
      low_body: low,
      medium_body: medium,
    };
    if (dimension?.data) {
      submitData.id = id;
      await updateTrigger(submitData, {
        onSuccess: () => mutate(),
      });
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
          <Autocomplete
            disablePortal
            id="dimension"
            options={contentOptions || []}
            value={selectedHighContent ? selectedHighContent : null}
            onInputChange={event => handleInputChange(event)}
            onChange={(event, newValue) => handleSelectHighPathwayChange(event, newValue)}
            renderInput={params => <TextField {...params} label="High body pathway" />}
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
          <Autocomplete
            disablePortal
            id="dimension"
            options={contentOptions || []}
            value={selectedMediumContent ? selectedMediumContent : null}
            onInputChange={event => handleInputChange(event)}
            onChange={(event, newValue) => handleSelectMediumPathwayChange(event, newValue)}
            renderInput={params => <TextField {...params} label="Medium body pathway" />}
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
            value={selectedLowContent ? selectedLowContent : null}
            onInputChange={event => handleInputChange(event)}
            onChange={(event, newValue) => handleSelectLowPathwayChange(event, newValue)}
            renderInput={params => <TextField {...params} label="Low body pathway" />}
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
