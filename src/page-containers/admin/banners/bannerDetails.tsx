"use client";
import ProgressBar from "@/components/ui/Progress";
import { useGetBannerById, usePostBanner, usePostFile, useUpdateBanner } from "@/services/banner";
import { SingleBannerDataResponse } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Button as MuiButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidCloudUpload } from "react-icons/bi";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  // image_url: yup.string().required("Image is required!"),
  external_link: yup.string().required("Link is required!"),
  is_active: yup.boolean().required("Status is required!"),
});

const BannerDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: createTrigger, isMutating: bannerMutating, error: createError } = usePostBanner();
  const { trigger: updateTrigger, isMutating: updateMutating, error: updateError } = useUpdateBanner();
  const { data: banner, mutate } = useGetBannerById<SingleBannerDataResponse>(id);

  const [imgProgress, setImgProgress] = useState<number>();
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgRes, setImgRes] = useState<any>();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const { trigger: fileTrigger, isMutating: fileMutating } = usePostFile();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (banner?.data) {
      if (banner?.data?.external_link_url) {
        setName(banner?.data?.external_link_url);
      }

      if (banner?.data?.image_url) {
        setImgUrl(banner?.data?.image_url);
      }

      if (banner?.data?.external_link_url) {
        setValue("external_link", banner?.data?.external_link_url);
      }

      if (banner?.data?.is_active) {
        setValue("is_active", banner?.data?.is_active);
      }
    }
  }, [banner?.data, setValue]);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const handleProgress = (percentage: number) => {
      setImgProgress(percentage);
    };
    const res = await fileTrigger({ file, handleProgress });
    console.log(res);
    setImgRes(res);
    // setValue("image_url", res?.data?.data?.file_path);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImgUrl(fileURL);
    }
  };

  const handleImgDelete = () => {
    setImgRes(null);
    setImgUrl("");
  };

  const Submit = async (data: any) => {
    if (banner?.data) {
      const updateData = {
        id: id,
        external_link: data?.external_link,
        image_url: imgRes ? imgRes?.data?.data?.image_url : imgUrl,
        is_active: data?.is_active,
      };
      await updateTrigger(updateData, {
        onSuccess: () => mutate(),
      });
      console.log(updateData);
    } else {
      const postData = {
        external_link_url: data?.external_link,
        image_url: imgRes ? imgRes?.data?.data?.image_url : imgUrl,
        is_active: data?.is_active,
      };

      await createTrigger(postData);
    }
    router.push("/admin/banners");
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
          {link ? (
            <TextField
              InputLabelProps={{ shrink: !!link }}
              {...register("external_link")}
              label="Link"
              id="link"
              defaultValue={link}
              className="w-full"
              variant="outlined"
            />
          ) : (
            <TextField
              {...register("external_link")}
              label="Link"
              id="link"
              defaultValue={link}
              className="w-full"
              variant="outlined"
            />
          )}
          <p className="mt-2 text-red-700">{errors.external_link?.message}</p>
        </div>

        <Controller
          name={"is_active"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <FormControlLabel
                control={<Checkbox {...field} checked={getValues("is_active")} />}
                label="Active Status"
              />

              <FormHelperText error={!!errors.is_active}>{errors.is_active?.message}</FormHelperText>
            </div>
          )}
        />

        <div className="mt-10">
          <div className="border border-dashed w-[30%] flex flex-col items-center justify-center p-10 border-gray-400 rounded-lg">
            <MuiButton
              sx={{ textTransform: "none", background: "#DA291C" }}
              component="label"
              variant="contained"
              startIcon={<BiSolidCloudUpload />}
              color="error"
            >
              Upload Image
              <VisuallyHiddenInput accept="image/*" onChange={handleImageChange} type="file" />
            </MuiButton>
            <p className="mt-3">Please upload 4:3 ratio</p>
            {imgProgress && <ProgressBar progress={imgProgress} />}
          </div>
          {imgUrl && (
            <div className="mt-4 flex">
              <div>
                <p className="font-bold mb-2">Image Preview:</p>
                <Image width={300} height={300} src={imgUrl} alt="File Preview" className="max-w-full h-auto" />
              </div>
              <div className="p-[100px]">
                <IconButton color="error" onClick={handleImgDelete}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
        {/*
        <div className="flex justify-between">
          <div></div> */}
        <div className="pt-6">
          {banner?.data ? (
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
              // loading={postMutating}
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
        {/* </div> */}
      </form>
    </>
  );
};

export default BannerDetail;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
