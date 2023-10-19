"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
});

interface PathwayType {
  pathway_id: number;
}

const ContentDetail = ({ id }: Props) => {
  const router = useRouter();
  const editorRef = useRef<any>();
  const { data: content } = useGetContentById<any>(id);
  const { data: contents } = useGetContent<ParamsType, ContentType>();
  // console.log("get contents...", contents);

  const { trigger: updateTrigger } = useUpdateContent(id);
  const { trigger: fileTrigger } = usePostFile();
  const { trigger: postTrigger } = usePostContent();
  const { data: category } = useGetContentCategory<ContentCategoryResponse>();
  const { data: formconfigs } = useGetFormConfig<FormConfigResponse>();

  const [selectedValue, setSelectedValue] = useState<string>(content?.data.type || "");
  // const [content, setContent] = useState<ContentResponseData | null>(null);

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>(content?.data.image_url || "");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectCategoryName, setSelectCategoryName] = useState<string>("");
  const [selectForm, setSelectForm] = useState<string>(
    content?.data?.content_opportunity?.formconfig_id || ""
  );
  const [selectFormName, setSelectFormName] = useState<string>(
    content?.data.content_opportunity?.form_config.name || ""
  );
  const [location, setLocation] = useState<string>(content?.data?.content_event?.location || "");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventError, setEventError] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  // const [editorContent, setEditorContent] = useState<any>(
  //   editorRef.current ? editorRef.current.getContent() : null
  // );
  const [link, setLink] = useState<string>(content?.data?.content_opportunity?.link || "");
  const [pathways, setPathways] = useState<PathwayType[]>([]);

  useEffect(() => {
    if (content?.data) {
      content.data.content_pathways?.map((cont: any) => {
        setPathways(prevPathways => [...prevPathways, { pathway_id: cont.id }]);
      });
    }
  }, []);
  console.log("content pathway", pathways);

  const form = useForm<{ title: string; description: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: content?.data?.title || undefined,
      description: content?.data?.description || undefined,
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
    let thumbnailUrl = "";
    let videoUrl = "";
    let imageUrl = "";
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
      imageUrl = imgRes.data?.data?.file_path;
    }

    if (selectedValue === "video") {
      const thumbnailRes: any = thumbnail && (await fileTrigger({ file: thumbnail }));
      const videoRes: any = file && (await fileTrigger({ file }));

      if (thumbnailRes) {
        thumbnailUrl = thumbnailRes.data?.data?.file_path;
      }
      if (videoRes) {
        videoUrl = videoRes.data?.data?.file_path;
        console.log("Video URL:", videoUrl);
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imageUrl,
        content_video: {
          video_url: videoUrl,
          thumbnail: thumbnailUrl,
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
        image_url: imageUrl,
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
      if (!editorRef.current.getContent()) {
        setEventError("Content is required!");
        return;
      }
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imageUrl,
        content_article: {
          article_body: editorRef.current.getContent(),
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
        image_url: imageUrl,
        content_opportunity: {
          link: link,
          formconfig_id: 1,
        },
      };
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "pathway") {
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: "published",
        category_id: Number(selectCategory),
        image_url: imageUrl,
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
    setStartDate(new Date(date).toISOString());
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(new Date(date).toISOString());
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

  const handleCheckboxChange = (id: number, isChecked: any) => {
    if (isChecked) {
      setPathways(prevPathways => [...prevPathways, { pathway_id: id }]);
    } else {
      setPathways(prevPathways => prevPathways.filter(pathway => pathway.pathway_id !== id));
    }
  };

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
                <div className="p-8">
                  <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
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
                <div className="p-8">
                  <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
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
                          value={startDate}
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
                          value={endDate}
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
                  <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
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
                <p className="text-sm font-semibold mb-3">Select Pathways</p>
                {contents?.data.map((item: any, index: number) => (
                  <form className="my-3" key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox.Root
                        onCheckedChange={isChecked => handleCheckboxChange(item.id, isChecked)}
                        defaultChecked={false}
                        className="CheckboxRoot"
                        id={`c${item.id}`}
                      >
                        <Checkbox.Indicator className="CheckboxIndicator">
                          <AiOutlineCheck size={25} className="text-red-700" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label className="Label" htmlFor={`c${item.id}`}>
                        {item?.title}
                      </label>
                    </div>
                  </form>
                ))}
              </>
            )}
            {/* {content && content?.video_url && (
          <div className="mt-4">
            <p className="font-bold mb-2">Video Preview:</p>
            <video width={300} height={300} controls>
              <source src={content.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )} */}
            {/* {content && content?.photo_url && (
          <div className="mt-4">
            <p className="font-bold mb-2">Thumbnail Preview:</p>
            <Image
              width={300}
              height={300}
              src={content.photo_url}
              alt="File Preview"
              className="max-w-full h-auto"
            />
          </div>
        )} */}
            <div className="p-8">
              <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
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
