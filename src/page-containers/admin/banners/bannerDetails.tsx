"use client";
import ProgressBar from "@/components/ui/Progress";
import { usePostBanner, useUpdateBanner } from "@/services/banner";
import { usePostFile } from "@/services/content";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, IconButton, Button as MuiButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCloudUpload } from "react-icons/bi";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  link: yup.string().required("Link is required!"),
});

const BannerDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: createTrigger, isMutating: bannerMutating, error: createError } = usePostBanner();
  const { trigger: updateTrigger, isMutating: updateMutating, error: updateError } = useUpdateBanner();

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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const handleProgress = (percentage: number) => {
      setImgProgress(percentage);
    };
    const res = await fileTrigger({ file, handleProgress });
    console.log(res);
    setImgRes(res);
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
    if (id !== "0") {
      const updateData = {
        id: id,
        name: data?.name,
        link: data?.link,
        image: imgRes ? imgRes?.data?.data?.file_path : imgUrl,
      };
      await updateTrigger(updateData);
    } else {
      const postData = {
        name: data?.name,
        link: data?.link,
        image: imgRes ? imgRes?.data?.data?.file_path : imgUrl,
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
          {link ? (
            <TextField
              InputLabelProps={{ shrink: !!link }}
              {...register("link")}
              label="Link"
              id="link"
              defaultValue={link}
              className="w-full"
              variant="outlined"
            />
          ) : (
            <TextField
              {...register("link")}
              label="Link"
              id="link"
              defaultValue={link}
              className="w-full"
              variant="outlined"
            />
          )}
          <p className="mt-2 text-red-700">{errors.link?.message}</p>
        </div>

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
          {shouldUpdate ? (
            <LoadingButton
              // loading={updateMutating}
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
