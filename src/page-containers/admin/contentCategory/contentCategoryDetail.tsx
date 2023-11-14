"use client";
import ProgressBar from "@/components/ui/Progress";
import { ParamsType, useGetBrowseContent, usePostFile } from "@/services/content";
import {
  useCreateContentCategory,
  useGetContentCategoryById,
  useUpdateContentCategory,
} from "@/services/contentCategory";
import { ContentType } from "@/types/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, Button, styled, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCloudUpload } from "react-icons/bi";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
});

interface OptionType {
  label: string;
  content_id: number;
}

const ContentCategoryDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: fileTrigger } = usePostFile();
  const { data: category, mutate } = useGetContentCategoryById<any>(id);
  const { trigger: updateTrigger, isMutating: updateMutating } = useUpdateContentCategory();
  const { trigger: createTrigger, isMutating: postMutating } = useCreateContentCategory();
  const [searchContent, setSearchContent] = useState<string>("");
  const [contentOptions, setContentOptions] = useState<OptionType[]>([]);
  const [categorySlug, setCategorySlug] = useState<string>("");
  const { data: contents } = useGetBrowseContent<ParamsType, ContentType>({
    page: 1,
    pagesize: 10,
    search: searchContent,
    category: categorySlug,
  });
  const [contentOne, setContentOne] = useState<OptionType>();
  const [contentTwo, setContentTwo] = useState<OptionType>();
  const [contentThree, setContentThree] = useState<OptionType>();
  const [contentFour, setContentFour] = useState<OptionType>();
  const [contentFive, setContentFive] = useState<OptionType>();
  const [initializeSearch, setInitializeSearch] = useState<boolean>(false);
  const [imgProgress, setImgProgress] = useState<number>();
  const [bannerProgress, setBannerProgress] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgRes, setImgRes] = useState<any>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [bannerRes, setBannerRes] = useState<any>();

  useEffect(() => {
    if (contents?.data && contents?.data.length > 0) {
      const updatedOptions = contents?.data.map((option: any) => ({
        label: option.title ? option.title : "",
        content_id: option.id,
      }));
      setContentOptions(updatedOptions);
    }
    if (initializeSearch === false) {
      if (category?.data) {
        const name = category?.data.name;
        const slug = name.toLowerCase().replace(/ /g, "-");
        setCategorySlug(slug);
      }
      if (category?.data.category_contents[0]) {
        setContentOne({
          label: category?.data.category_contents[0]?.content.title,
          content_id: category?.data.category_contents[0]?.content.id,
        });
      }
      if (category?.data.category_contents[1]) {
        setContentTwo({
          label: category?.data.category_contents[1]?.content.title,
          content_id: category?.data.category_contents[1]?.content.id,
        });
      }
      if (category?.data.category_contents[2]) {
        setContentThree({
          label: category?.data.category_contents[2]?.content.title,
          content_id: category?.data.category_contents[2]?.content.id,
        });
      }
      if (category?.data.category_contents[3]) {
        setContentFour({
          label: category?.data.category_contents[3]?.content.title,
          content_id: category?.data.category_contents[3]?.content.id,
        });
      }
      if (category?.data.category_contents[4]) {
        setContentFive({
          label: category?.data.category_contents[4]?.content.title,
          content_id: category?.data.category_contents[4]?.content.id,
        });
      }

      setValue("name", category?.data.name);
      setImgUrl(category?.data.icon_url);
      setBannerUrl(category?.data.banner_icon_url);
    }
  }, [category?.data, searchContent]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const Submit = async (data: any) => {
    const id1 = contentOne?.content_id;
    const id2 = contentTwo?.content_id;
    const id3 = contentThree?.content_id;
    const id4 = contentFour?.content_id;
    const id5 = contentFive?.content_id;
    const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
    const bannerurl = bannerRes ? bannerRes?.data?.data?.file_path : bannerUrl;
    const submitData: any = {
      name: data?.name,
      content_ids: [id1, id2, id3, id4, id5],
      icon_url: imgurl,
      banner_icon_url: bannerurl,
      order: 1,
    };
    if (category?.data) {
      submitData.id = id;
      await updateTrigger(submitData, {
        onSuccess: () => mutate(),
      });
    } else {
      await createTrigger(submitData);
    }
    router.push("/admin/contents/category");
  };

  const handleInputChange = (event: any) => {
    setInitializeSearch(true);
    setSearchContent(event?.target.value);
  };

  const handleChangeOne = (event: any, newValue: any) => {
    setContentOne(newValue);
    setSearchContent("");
  };
  const handleChangeTwo = (event: any, newValue: any) => {
    setContentTwo(newValue);
    setSearchContent("");
  };
  const handleChangeThree = (event: any, newValue: any) => {
    setContentThree(newValue);
    setSearchContent("");
  };
  const handleChangeFour = (event: any, newValue: any) => {
    setContentFour(newValue);
    setSearchContent("");
  };
  const handleChangeFive = (event: any, newValue: any) => {
    setContentFive(newValue);
    setSearchContent("");
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const handleProgress = (percentage: number) => {
      // console.log(`progress ${percentage}`);
      setImgProgress(percentage);
    };
    const res = await fileTrigger({ file, handleProgress });
    setImgRes(res);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImgUrl(fileURL);
    }
  };

  const handleBannerImageChange = async (event: any) => {
    const file = event.target.files[0];
    const handleProgress = (percentage: number) => {
      // console.log(`progress ${percentage}`);
      setBannerProgress(percentage);
    };
    const res = await fileTrigger({ file, handleProgress });
    setBannerRes(res);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setBannerUrl(fileURL);
    }
  };

  return (
    <>
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
            <div className="border border-dashed w-[30%] flex flex-col items-center justify-center p-10 border-gray-400 rounded-lg">
              <Button
                sx={{ textTransform: "none", background: "#DA291C" }}
                component="label"
                variant="contained"
                startIcon={<BiSolidCloudUpload />}
                color="error"
              >
                Upload Icon
                <VisuallyHiddenInput accept="image/*" onChange={handleImageChange} type="file" />
              </Button>
              {imgProgress && <ProgressBar progress={imgProgress} />}
            </div>
          </div>
          <div className="mb-10">
            {imgUrl && (
              <div className="mt-4">
                <p className="font-bold mb-2">Icon Preview:</p>
                <Image width={300} height={300} src={imgUrl} alt="File Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>
          <div className="mb-10">
            <div className="border border-dashed w-[30%] flex flex-col items-center justify-center p-10 border-gray-400 rounded-lg">
              <Button
                sx={{ textTransform: "none", background: "#DA291C" }}
                component="label"
                variant="contained"
                startIcon={<BiSolidCloudUpload />}
                color="error"
              >
                Upload Banner Image
                <VisuallyHiddenInput accept="image/*" onChange={handleBannerImageChange} type="file" />
              </Button>
              {bannerProgress && <ProgressBar progress={bannerProgress} />}
            </div>
          </div>
          <div className="mb-10">
            {bannerUrl && (
              <div className="mt-4">
                <p className="font-bold mb-2">Banner Image Preview:</p>
                <Image width={300} height={300} src={bannerUrl} alt="File Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>
          <div className="mb-10">
            <Autocomplete
              disablePortal
              id="dimension"
              options={contentOptions || []}
              value={contentOne ? contentOne : null}
              onInputChange={event => handleInputChange(event)}
              onChange={(event, newValue) => handleChangeOne(event, newValue)}
              renderInput={params => <TextField {...params} label="Content One" />}
            />
          </div>
          <div className="mb-10">
            <Autocomplete
              disablePortal
              id="dimension"
              options={contentOptions || []}
              value={contentTwo ? contentTwo : null}
              onInputChange={event => handleInputChange(event)}
              onChange={(event, newValue) => handleChangeTwo(event, newValue)}
              renderInput={params => <TextField {...params} label="Content Two" />}
            />
          </div>
          <div className="mb-10">
            <Autocomplete
              disablePortal
              id="dimension"
              options={contentOptions || []}
              value={contentThree ? contentThree : null}
              onInputChange={event => handleInputChange(event)}
              onChange={(event, newValue) => handleChangeThree(event, newValue)}
              renderInput={params => <TextField {...params} label="Content Three" />}
            />
          </div>
          <div className="mb-10">
            <Autocomplete
              disablePortal
              id="dimension"
              options={contentOptions || []}
              value={contentFour ? contentFour : null}
              onInputChange={event => handleInputChange(event)}
              onChange={(event, newValue) => handleChangeFour(event, newValue)}
              renderInput={params => <TextField {...params} label="Content Four" />}
            />
          </div>
          <div className="mb-10">
            <Autocomplete
              disablePortal
              id="dimension"
              options={contentOptions || []}
              value={contentFive ? contentFive : null}
              onInputChange={event => handleInputChange(event)}
              onChange={(event, newValue) => handleChangeFive(event, newValue)}
              renderInput={params => <TextField {...params} label="Content Five" />}
            />
          </div>
          <div className="flex justify-between">
            <div></div>
            <div>
              {category?.data ? (
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
    </>
  );
};

export default ContentCategoryDetail;

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
