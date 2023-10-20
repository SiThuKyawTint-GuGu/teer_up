"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Inputs/Select";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import {
  ParamsType,
  useGetContent,
  useGetContentById,
  usePostContent,
  usePostFile,
  useUpdateContent,
} from "@/services/content";
import { useGetContentCategory } from "@/services/contentCategory";
import { useGetFormConfig } from "@/services/formConfig";
import "@/styles/checkbox.css";
import "@/styles/switch.css";
import "@/styles/tab.css";
import { ContentType } from "@/types/Content";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { FormConfigResponse } from "@/types/Formconfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button as MuiButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { BiSolidCloudUpload } from "react-icons/bi";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
});

interface OptionType {
  label: string;
  id: number;
}

const ContentDetail = ({ id }: Props) => {
  const router = useRouter();
  const { data: content, isLoading } = useGetContentById<any>(id);
  const { data: contents } = useGetContent<ParamsType, ContentType>();
  // console.log("get contents...", contents);

  const { trigger: updateTrigger } = useUpdateContent(id);
  const { trigger: fileTrigger } = usePostFile();
  const { trigger: postTrigger } = usePostContent();
  const { data: category } = useGetContentCategory<ContentCategoryResponse>();
  const { data: formconfigs } = useGetFormConfig<FormConfigResponse>();

  const [selectedValue, setSelectedValue] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectCategoryName, setSelectCategoryName] = useState<string>("");
  const [selectForm, setSelectForm] = useState<string>("");
  const [selectFormName, setSelectFormName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventError, setEventError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [editorContent, setEditorContent] = useState<any>("");
  const [link, setLink] = useState<string>("");
  const [pathwayContent, setPathwayContent] = useState([{ name: "", pathway_id: "" }]);
  const [editor, setEditor] = useState<any>(null);
  const [contentOptions, setContentOptions] = useState<OptionType[]>([]);
  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
  };
  const { setValue } = useForm();
  useEffect(() => {
    if (editor) {
      editor.setContent(editorContent);
    }
    if (content?.data) {
      setSelectCategoryName(content?.data?.category?.name);
      setSelectedValue(content?.data.type);
      setSelectCategory(content?.data?.category?.id);
      setEditorContent(content?.data?.content_article?.article_body);
      setLink(content?.data?.content_opportunity?.link);
      setAuthor(content?.data?.content_article?.published_by);
      setSelectFormName(content?.data.content_opportunity?.form_config.name);
      setSelectForm(content?.data?.content_opportunity?.formconfig_id);
      setImgUrl(content?.data.image_url);
      setFileUrl(content?.data?.content_video?.thumbnail);
      setVideoUrl(content?.data?.content_video?.video_url);
      setLocation(content?.data?.content_event?.location);
      setStartDate(content?.data?.content_event?.from_datetime);
      setEndDate(content?.data?.content_event?.to_datetime);
      const pathwayContentData = content?.data.content_pathways.map((pathway: any) => ({
        name: pathway.pathway.title, // Change this to the appropriate field you want
        pathway_id: pathway.pathway.id,
      }));
      setPathwayContent(pathwayContentData);

      // setTitle(content?.data.title);
      // setDesc(content?.data.description);
      setValue("title", content?.data.title);
      setValue("description", content?.data.description);
    }
    if (contents?.data) {
      const updatedOptions = contents?.data.map((option: any) => ({
        label: option.title,
        id: option.id,
      }));
      setContentOptions(updatedOptions);
    }
  }, [editorContent, editor, contents?.data, content?.data]);

  const form = useForm<{ title: string; description: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: content?.data.title || undefined,
      description: content?.data.description || undefined,
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFile(file);
      setVideoUrl(fileURL);
    }
  };

  const handleSubmit = async (data: { title: string; description: string }) => {
    let postdata: any = {};
    if (!selectCategory) {
      setEventError("Please select category!");
      return;
    }
    if (!selectedValue) {
      setEventError("Please select type!");
      return;
    }

    const imgRes: any = image && (await fileTrigger({ file: image }));
    if (imgRes) {
      setImgUrl(imgRes.data?.data?.file_path);
    }

    if (selectedValue === "video") {
      const thumbnailRes: any = thumbnail && (await fileTrigger({ file: thumbnail }));
      const videoRes: any = file && (await fileTrigger({ file }));

      if (thumbnailRes) {
        setFileUrl(thumbnailRes.data?.data?.file_path);
      }
      if (videoRes) {
        setVideoUrl(videoRes.data?.data?.file_path);
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        content_video: {
          video_url: videoUrl,
          thumbnail: fileUrl,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "event") {
      if (!location) {
        setEventError("Location is required!");
        return;
      }
      if (!startDate) {
        setEventError("Start Date is required!");
        return;
      }
      if (!endDate) {
        setEventError("End Date is required!");
        return;
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        content_event: {
          from_datetime: startDate,
          to_datetime: endDate,
          location: location,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "article") {
      if (!author) {
        setEventError("Author name is required!");
        return;
      }
      if (!editor.getContent()) {
        setEventError("Content is required!");
        return;
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        content_article: {
          article_body: editor.getContent(),
          published_by: author,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "opportunity") {
      if (!link) {
        setEventError("Link is required!");
        return;
      }
      if (!selectForm) {
        setEventError("Please Select Form!");
        return;
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        content_opportunity: {
          link: link,
          formconfig_id: 1,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "pathway") {
      const pathways = pathwayContent.map((path: any) => ({ pathway_id: path.pathway_id }));
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        content_pathways: pathways,
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    }

    router.push("/admin/contents/content");
  };

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const fileURL = URL.createObjectURL(file);
      setImgUrl(fileURL);
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    setSelectedValue(selectedValue);
  };

  const handleStartDateChange = (date: any) => {
    // setStartDate(new Date(date).toISOString());
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    // setEndDate(new Date(date).toISOString());
    setEndDate(date);
  };

  const handleCategorySelectChange = (selectedValue: string) => {
    setSelectCategory(selectedValue);
    const selectItem = category?.data.find((cat: any) => cat.id === Number(selectedValue));
    setSelectCategoryName(selectItem?.name || "");
  };

  const handleFormSelectChange = (selectedValue: string) => {
    setSelectForm(selectedValue);
    const selectItem = formconfigs?.data.find((cat: any) => cat.id === Number(selectedValue));
    setSelectFormName(selectItem?.name || "");
  };

  const handleAddPathway = () => {
    const updatedOptions = [...pathwayContent, { name: "", pathway_id: "" }];
    setPathwayContent(updatedOptions);
  };

  const handleDeletePathway = (indexValue: number) => {
    const updatedFields = pathwayContent.filter((field, index) => index !== indexValue);
    setPathwayContent(updatedFields);
  };

  const handleInputChange = async (event: any, newInputValue: any) => {
    // console.log(newInputValue);
  };
  const handleSelectPathwayChange = (event: any, newValue: any, index: number) => {
    const updatedPathways = [...pathwayContent];

    updatedPathways[index] = { pathway_id: newValue ? newValue.id : "", name: newValue.label };
    setPathwayContent(updatedPathways);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="bg-white p-10 rounded-md">
            <div className="mb-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <InputText placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <InputText placeholder="Description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-10">
              <p className="text-sm font-semibold mb-3">Select Category</p>
              <Select onValueChange={handleCategorySelectChange}>
                <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                  {selectCategoryName || "Category"}
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {category?.data.map((cat: any, index: number) => (
                    <SelectItem key={index} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-10">
              <p className="text-sm font-semibold mb-3">Selct Type</p>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                  {content?.type ? content.type : selectedValue ? selectedValue : "Type"}
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="video">video</SelectItem>
                  <SelectItem value="event">event</SelectItem>
                  <SelectItem value="article">article</SelectItem>
                  <SelectItem value="opportunity">opportunity</SelectItem>
                  <SelectItem value="pathway">pathway</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {eventError && <p className="text-red-700 mb-3">{eventError}</p>}
            {selectedValue === "video" && (
              <>
                <div className="mt-5">
                  <label className="flex items-center w-[20%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                    <BiSolidCloudUpload size={23} />
                    <span className="text-base font-medium">Upload Video</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                      multiple={false}
                    />
                  </label>

                  {videoUrl && (
                    <div className="mt-4">
                      <p className="font-bold mb-2">Video Preview:</p>
                      <video className="w-[300px] h-[300px]" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <label className="flex items-center w-[25%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                    <BiSolidCloudUpload size={23} />
                    <span className="text-base font-medium">Upload Thumbnail</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>

                  {fileUrl && (
                    <div className="mt-4">
                      <p className="font-bold mb-2">Thumbnail Preview:</p>
                      <Image
                        width={300}
                        height={300}
                        src={fileUrl}
                        alt="File Preview"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {selectedValue === "event" && (
              <>
                <div className="flex">
                  <div className="mr-10">
                    <p className="text-sm font-semibold">Start Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          value={dayjs(startDate)}
                          onChange={handleStartDateChange}
                          label="Start Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">End Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          value={dayjs(endDate)}
                          onChange={handleEndDateChange}
                          label="End Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="my-5">
                  <p className="text-sm mb-2 font-semibold">Location</p>
                  <fieldset className="Fieldset">
                    <input
                      onChange={e => setLocation(e.target.value)}
                      className="Input"
                      defaultValue={location || ""}
                    />
                  </fieldset>
                </div>
              </>
            )}
            {selectedValue === "article" && (
              <>
                <div className="my-5">
                  <p className="text-sm mb-2 font-semibold">Published By</p>
                  <fieldset className="Fieldset">
                    <input
                      onChange={e => setAuthor(e.target.value)}
                      className="Input"
                      defaultValue={author || ""}
                    />
                  </fieldset>
                </div>
                <div className="mb-10">
                  <p className="text-sm font-semibold mb-3">Content</p>
                  <Editor onInit={handleEditorInit} />
                </div>
              </>
            )}
            {selectedValue === "opportunity" && (
              <>
                <div className="my-5">
                  <p className="text-sm mb-2 font-semibold">Link</p>
                  <fieldset className="Fieldset">
                    <input
                      onChange={e => setLink(e.target.value)}
                      className="Input"
                      defaultValue={link || ""}
                    />
                  </fieldset>
                </div>
                <div className="mb-10">
                  <p className="text-sm font-semibold mb-3">Select Form</p>
                  <Select onValueChange={handleFormSelectChange}>
                    <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                      {selectFormName || "Form"}
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {formconfigs?.data.map((cat: any, index: number) => (
                        <SelectItem key={index} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {selectedValue === "pathway" && (
              <>
                <MuiButton
                  style={{ textTransform: "none" }}
                  color="error"
                  variant="contained"
                  onClick={handleAddPathway}
                >
                  <AiOutlinePlus size={20} />
                  Add Pathway
                </MuiButton>
                {pathwayContent.map((pathway: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 mt-10">
                    {/* <TextField
                      size="small"
                      id="outlined-basic"
                      label="Pathway Name"
                      variant="outlined"
                    /> */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={contentOptions || []}
                      sx={{ width: 300 }}
                      value={pathway.name}
                      onInputChange={handleInputChange}
                      onChange={(event, newValue) =>
                        handleSelectPathwayChange(event, newValue, index)
                      }
                      // onChange={handleSelectPathwayChange}
                      renderInput={params => (
                        <TextField {...params} size="small" label="Contents" />
                      )}
                    />
                    <AiFillDelete
                      onClick={() => handleDeletePathway(index)}
                      className="cursor-pointer"
                      size={25}
                      color="#d8291c"
                    />
                  </div>
                ))}
              </>
            )}
            <div className="mt-5">
              <label className="flex items-center w-[20%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                <BiSolidCloudUpload size={23} />
                <span className="text-base font-medium">Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {imgUrl && (
                <div className="mt-4">
                  <p className="font-bold mb-2">Image Preview:</p>
                  <Image
                    width={300}
                    height={300}
                    src={imgUrl}
                    alt="File Preview"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
            <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
              <Button className="p-2 mt-[20px] rounded-md w-[15%] text-white" type="submit">
                {id != "0" ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContentDetail;
