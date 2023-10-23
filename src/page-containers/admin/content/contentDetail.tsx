"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Inputs/Select";

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
import { useGetKeywords } from "@/services/keyword";
import "@/styles/checkbox.css";
import "@/styles/switch.css";
import "@/styles/tab.css";
import { ContentType } from "@/types/Content";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { FormConfigResponse } from "@/types/Formconfig";
import { KeywordResponse } from "@/types/Keyword";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button as MuiButton, styled } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  category: yup.string().required("Please select category!"),
  type: yup.string().required("Please select type!"),
});

interface OptionType {
  label: string;
  id: number;
}

const ContentDetail = ({ id }: Props) => {
  const router = useRouter();
  const { data: content, isLoading } = useGetContentById<any>(id);
  const { data: contents } = useGetContent<ParamsType, ContentType>();
  const { data: keywords } = useGetKeywords<KeywordResponse>();
  // console.log("key words", keywords);
  // console.log("get contents...", contents);

  const { trigger: updateTrigger, isMutating: updateMutating } = useUpdateContent(id);
  const { trigger: fileTrigger } = usePostFile();
  const { trigger: postTrigger, isMutating: postMutating } = usePostContent();
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
  const [selectForm, setSelectForm] = useState<string>("");

  const [location, setLocation] = useState<string>("");
  const [oppoLocation, setOppoLocation] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventError, setEventError] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [editorContent, setEditorContent] = useState<any>("");
  const [oppoEditorContent, setOppoEditorContent] = useState<any>("");
  const [link, setLink] = useState<string>("");
  const [pathwayContent, setPathwayContent] = useState([{ name: "", pathway_id: "" }]);
  const [editor, setEditor] = useState<any>(null);
  const [oppoEditor, setOppoEditor] = useState<any>(null);
  const [contentOptions, setContentOptions] = useState<OptionType[]>([]);
  const [keywordOptions, setKeywordOptions] = useState<OptionType[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<OptionType[]>([]);
  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
  };
  const handleOppoEditorInit = (evt: any, editor: any) => {
    setOppoEditor(editor);
  };

  useEffect(() => {
    if (editor) {
      editor?.setContent(editorContent);
    }
    if (oppoEditor) {
      oppoEditor?.setContent(oppoEditorContent);
    }
    if (content?.data) {
      setSelectedValue(content?.data.type);
      setSelectCategory(content?.data?.category?.id);
      setEditorContent(content?.data?.content_article?.body);
      setOppoEditorContent(content?.data?.content_opportunity?.body);
      setLink(content?.data?.content_opportunity?.link);
      setOppoLocation(content?.data?.content_opportunity?.location);
      setAuthor(content?.data?.content_article?.published_by);
      if (content?.data?.type === "event") {
        setSelectForm(content?.data?.content_event?.formconfig_id);
      } else if (content?.data?.type === "opportunity") {
        setSelectForm(content?.data?.content_opportunity?.formconfig_id);
      } else {
        setSelectForm(content?.data?.content_article?.formconfig_id);
      }
      setImgUrl(content?.data.image_url);
      setFileUrl(content?.data?.content_video?.thumbnail);
      setVideoUrl(content?.data?.content_video?.video_url);
      setLocation(content?.data?.content_event?.location);
      setEventLink(content?.data?.content_event?.link);
      setStartDate(content?.data?.content_event?.from_datetime);
      setEndDate(content?.data?.content_event?.to_datetime);
      const pathwayContentData = content?.data.content_pathways.map((pathway: any) => ({
        name: pathway?.title,
        pathway_id: pathway?.id,
      }));
      setPathwayContent(pathwayContentData);
      const selectKeywords = content?.data.content_keywords.map((keyword: any) => ({
        label: keyword.keyword?.keyword,
        id: keyword?.keyword?.id,
      }));
      setSelectedKeywords(selectKeywords);
      setValue("title", content?.data.title);
      setValue("description", content?.data.description);
      setValue("category", content?.data?.category?.id);
      setValue("type", content?.data.type);
    }
    if (contents?.data) {
      const updatedOptions = contents?.data.map((option: any) => ({
        label: option.title,
        id: option.id,
      }));
      setContentOptions(updatedOptions);
    }
    if (keywords?.data) {
      const updatedOptions = keywords?.data.map((option: any) => ({
        label: option.keyword,
        id: option.id,
      }));
      setKeywordOptions(updatedOptions);
    }
  }, [editorContent, editor, oppoEditor, oppoEditorContent, contents?.data, content?.data]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFile(file);
      setVideoUrl(fileURL);
    }
  };

  const submit = async (data: any) => {
    let postdata: any = {};
    if (!imgUrl) {
      setEventError("Image is required!");
      return;
    }
    const imgRes: any = image && (await fileTrigger({ file: image }));
    if (imgRes) {
      setImgUrl(imgRes.data?.data?.file_path);
    }

    if (selectedValue === "video") {
      if (!file) {
        setEventError("Video is required!");
      }
      if (!thumbnail) {
        setEventError("Thumbnail is requried!");
      }
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
        description: data.description,
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
      if (!startDate) {
        setEventError("Start Date is required!");
        return;
      }
      if (!endDate) {
        setEventError("End Date is required!");
        return;
      }
      if (!location) {
        setEventError("Location is required!");
        return;
      }
      if (!eventLink) {
        setEventError("Link is required!");
        return;
      }
      if (!selectForm) {
        setEventError("Please select form!");
        return;
      }
      const keywords = selectedKeywords.map(item => item.id);
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        keywords,
        content_event: {
          from_datetime: startDate,
          to_datetime: endDate,
          location: location,
          link: eventLink,
          formconfig_id: selectForm,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "article") {
      if (!author) {
        setEventError("Author name is required!");
        return;
      }
      if (!selectForm) {
        setEventError("Please select form!");
        return;
      }
      if (!editor.getContent()) {
        setEventError("Content is required!");
        return;
      }
      const keywords = selectedKeywords.map(item => item.id);
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        keywords,
        content_article: {
          body: editor.getContent(),
          published_by: author,
          formconfig_id: selectForm,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "opportunity") {
      if (!link) {
        setEventError("Link is required!");
        return;
      }
      if (!oppoLocation) {
        setEventError("Location is required!");
        return;
      }
      if (!selectForm) {
        setEventError("Please Select Form!");
        return;
      }
      if (!oppoEditor.getContent()) {
        setEventError("Opportunity Content is required!");
        return;
      }
      const keywords = selectedKeywords.map(item => item.id);
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imgUrl,
        keywords,
        content_opportunity: {
          link: link,
          formconfig_id: selectForm,
          location: oppoLocation,
          body: oppoEditor.getContent(),
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "pathway") {
      const pathways = pathwayContent.map((path: any) => ({ pathway_id: path.pathway_id }));
      const keywords = selectedKeywords.map(item => item.id);
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        keywords,
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    setSelectForm("");
  };

  const handleStartDateChange = (date: any) => {
    // setStartDate(new Date(date).toISOString());
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    // setEndDate(new Date(date).toISOString());
    setEndDate(date);
  };
  const handleCategorySelectChange = (event: SelectChangeEvent) => {
    setSelectCategory(event.target.value);
  };

  const handleFormSelectChange = (event: SelectChangeEvent) => {
    setSelectForm(event.target.value);
  };

  const handleAddPathway = () => {
    const updatedOptions = [...pathwayContent, { name: "", pathway_id: "" }];
    setPathwayContent(updatedOptions);
  };

  const handleKeywordChange = (event: any, newValue: any) => {
    setSelectedKeywords(newValue);
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
      <form onSubmit={handleSubmit(submit)} className="space-y-8">
        <div className="bg-white p-10 rounded-md">
          <div className="mb-10">
            <TextField
              {...register("title")}
              // required
              label="Title"
              size="small"
              className="w-full"
              variant="outlined"
            />
            <p className="mt-2 text-red-700">{errors.title?.message}</p>
          </div>
          <div className="mb-10">
            <div className="mb-10">
              <TextField
                {...register("description")}
                label="Description"
                size="small"
                multiline
                rows={4}
                className="w-full"
                variant="outlined"
              />
              <p className="mt-2 text-red-700">{errors.description?.message}</p>
            </div>
          </div>
          <div className="mb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                {...register("category")}
                size="small"
                labelId="category"
                id="category"
                value={selectCategory}
                label="Category"
                onChange={handleCategorySelectChange}
              >
                {category?.data.map((cat: any, index: number) => (
                  <MenuItem key={index} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.category?.message}</p>
          </div>
          <div className="mb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="selectType">Type</InputLabel>
              <Select
                {...register("type")}
                size="small"
                labelId="selectType"
                id="selectType"
                value={selectedValue}
                label="Type"
                onChange={handleSelectChange}
              >
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="article">Article</MenuItem>
                <MenuItem value="opportunity">Opportunity</MenuItem>
                <MenuItem value="pathway">Pathway</MenuItem>
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.type?.message}</p>
          </div>
          {eventError && <p className="text-red-700 mb-3">{eventError}</p>}
          {/* Keywords */}
          <div className="my-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={keywordOptions || []}
              size="small"
              value={selectedKeywords}
              onChange={handleKeywordChange}
              renderInput={params => (
                <TextField {...params} label="Select keywords" placeholder="Keywords" />
              )}
            />
          </div>
          {selectedValue === "video" && (
            <>
              <div className="mt-10">
                <MuiButton
                  sx={{ textTransform: "none", background: "#DA291C" }}
                  component="label"
                  color="error"
                  variant="contained"
                  startIcon={<BiSolidCloudUpload />}
                >
                  Upload Video
                  <VisuallyHiddenInput accept="video/*" onChange={handleFileChange} type="file" />
                </MuiButton>

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
              <div className="mt-10">
                <MuiButton
                  component="label"
                  variant="contained"
                  sx={{ textTransform: "none", background: "#DA291C" }}
                  color="error"
                  startIcon={<BiSolidCloudUpload />}
                >
                  Upload thumbnail
                  <VisuallyHiddenInput accept="image/*" onChange={handlePhotoChange} type="file" />
                </MuiButton>

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
              <div className="flex mb-10">
                <div className="mr-10">
                  <p className="text-sm font-semibold">Start Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "45px",
                          },
                        }}
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
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "45px",
                          },
                        }}
                        value={dayjs(endDate)}
                        onChange={handleEndDateChange}
                        label="End Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="mb-10 ">
                <TextField
                  onChange={e => setLocation(e.target.value)}
                  value={location}
                  label="Location"
                  size="small"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10 ">
                <TextField
                  onChange={e => setEventLink(e.target.value)}
                  value={eventLink}
                  label="Link"
                  size="small"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl size="small" fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
                    size="small"
                    labelId="selectForm"
                    id="selectForm"
                    value={selectForm}
                    label="Form"
                    onChange={handleFormSelectChange}
                  >
                    {formconfigs?.data.map((cat: any, index: number) => (
                      <MenuItem key={index} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </>
          )}
          {selectedValue === "article" && (
            <>
              <div className="mb-10">
                <TextField
                  onChange={e => setAuthor(e.target.value)}
                  value={author}
                  label="Published By"
                  size="small"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl size="small" fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
                    size="small"
                    labelId="selectForm"
                    id="selectForm"
                    value={selectForm}
                    label="Form"
                    onChange={handleFormSelectChange}
                  >
                    {formconfigs?.data.map((cat: any, index: number) => (
                      <MenuItem key={index} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-10">
                <p className="text-md font-semibold mb-3">Content</p>
                <Editor onInit={handleEditorInit} />
              </div>
            </>
          )}
          {selectedValue === "opportunity" && (
            <>
              <div className="mb-10">
                <TextField
                  onChange={e => setLink(e.target.value)}
                  value={link}
                  label="Link"
                  size="small"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <TextField
                  onChange={e => setOppoLocation(e.target.value)}
                  value={oppoLocation}
                  label="Location"
                  size="small"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl size="small" fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
                    size="small"
                    labelId="selectForm"
                    id="selectForm"
                    value={selectForm}
                    label="Form"
                    onChange={handleFormSelectChange}
                  >
                    {formconfigs?.data.map((cat: any, index: number) => (
                      <MenuItem key={index} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-10">
                <p className="text-md font-semibold mb-3">Opportunity Content</p>
                <Editor onInit={handleOppoEditorInit} />
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
                    renderInput={params => <TextField {...params} size="small" label="Contents" />}
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
          <div className="mt-10">
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
            {content?.data ? (
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

export default ContentDetail;

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
