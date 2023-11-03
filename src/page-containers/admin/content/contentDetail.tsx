"use client";
import HtmlEditor from "@/components/ui/Editor";
import {
  ParamsType,
  useGetContent,
  useGetContentById,
  usePostContent,
  usePostFile,
  useUpdateContent,
} from "@/services/content";
import { useGetContentCategory } from "@/services/contentCategory";
import { useGetContentDimensionById, useUpdateContentDimension } from "@/services/contentDimension";
import { useGetDepartment } from "@/services/department";
import { useGetDimension } from "@/services/dimension";
import { useGetFormConfig } from "@/services/formConfig";
import { useGetIndustry } from "@/services/industry";
import { useGetKeywords } from "@/services/keyword";
import { ParamsType as UserParamsType, useGetUsers } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import "@/styles/tab.css";
import { ContentType } from "@/types/Content";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { DepartmentResponse } from "@/types/Department";
import { DimensionResponse } from "@/types/Dimension";
import { FormConfigResponse } from "@/types/Formconfig";
import { IndustryResponse } from "@/types/Industry";
import { KeywordResponse } from "@/types/Keyword";
import { UserResponse } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button as MuiButton, Checkbox, styled } from "@mui/material";
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
import { Box } from "@radix-ui/themes";
import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { BiSolidCloudUpload } from "react-icons/bi";
import * as yup from "yup";
import SubmissionTable from "./submissionTable";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  category: yup.string().required("Please select category!"),
  type: yup.string().required("Please select type!"),
  status: yup.string().required("Please select status!"),
});

interface OptionType {
  label: string;
  id: number;
}

const ContentDetail = ({ id }: Props) => {
  const router = useRouter();
  const [searchMentor, setSearchMentor] = useState<string>("");
  const { data: content, isLoading } = useGetContentById<any>(id);
  const [searchContent, setSearchContent] = useState<string>("");
  const [initialSearchContent, setInitialSearchContent] = useState<boolean>(false);
  const { data: contents } = useGetContent<ParamsType, ContentType>({
    page: 1,
    pagesize: 10,
    search: searchContent,
  });
  const { data: keywords } = useGetKeywords<KeywordResponse>();
  const { data: departments } = useGetDepartment<DepartmentResponse>();
  const { data: industries } = useGetIndustry<IndustryResponse>();
  const { data: userData } = useGetUsers<UserParamsType, UserResponse>({
    page: 1,
    pageSize: 10,
    role: USER_ROLE.MENTOR,
    name: searchMentor,
  });
  const { data: dimensions } = useGetDimension<DimensionResponse>();
  const { trigger: updateContentDimensionTrigger } = useUpdateContentDimension(id);
  const { data: contentDimension } = useGetContentDimensionById<any>(id);
  // console.log("content dimension data", contentDimension);
  // console.log("get contents...", contents);

  const { trigger: updateTrigger, isMutating: updateMutating, error: updateError } = useUpdateContent(id);
  const { trigger: fileTrigger, isMutating: fileMutating } = usePostFile();
  const { trigger: postTrigger, isMutating: postMutating, error: createError } = usePostContent();
  const { data: category } = useGetContentCategory<ContentCategoryResponse>();
  const { data: formconfigs } = useGetFormConfig<FormConfigResponse>();

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");
  // const [fileUrl, setFileUrl] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  // const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectForm, setSelectForm] = useState<string>("");
  const [selectedMentor, setSelelectedMentor] = useState<any>(null);

  const [location, setLocation] = useState<string>("");
  const [oppoLocation, setOppoLocation] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventError, setEventError] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [editorContent, setEditorContent] = useState<any>("");
  const [oppoEditorContent, setOppoEditorContent] = useState<any>("");
  const [htmlContent, setHtmlContent] = useState<any>({});
  const [link, setLink] = useState<string>("");
  const [pathwayContent, setPathwayContent] = useState<any[]>([]);
  const [editor, setEditor] = useState<any>(null);
  const [oppoEditor, setOppoEditor] = useState<any>(null);
  const [htmlEditors, setHtmlEditors] = useState<any>(null);
  const [contentOptions, setContentOptions] = useState<OptionType[]>([]);
  const [keywordOptions, setKeywordOptions] = useState<OptionType[]>([]);
  const [industryOptions, setIndustryOptions] = useState<OptionType[]>([]);
  const [mentorOptions, setMentorOptions] = useState<OptionType[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<OptionType[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<OptionType[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<OptionType[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<OptionType[]>([]);
  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
  };
  const handleOppoEditorInit = (evt: any, editor: any) => {
    setOppoEditor(editor);
  };
  const handleEditorHtmlBody = (editor: any) => {
    setHtmlEditors(editor);
  };

  useEffect(() => {
    if (editor) {
      editor?.setContent(editorContent);
    }
    if (htmlEditors) {
      htmlEditors?.setContent(htmlContent);
    }
    if (oppoEditor) {
      oppoEditor?.setContent(oppoEditorContent);
    }
    if (contentDimension?.data) {
      const transformedData = contentDimension?.data?.content_dimensions.reduce((result: any, item: any) => {
        const { dimension_id, low, medium, high, scores } = item;
        result[dimension_id] = { low, medium, high, scores };
        return result;
      }, {});
      // console.log("transf data", transformedData);
      setCheckboxValues(transformedData);
    }
    if (content?.data) {
      setSelectedValue(content?.data.type);
      setSelectedStatus(content?.data?.status);
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
      // setFileUrl(content?.data?.content_video?.thumbnail);
      setVideoUrl(content?.data?.content_video?.video_url);
      setLocation(content?.data?.content_event?.location);
      setEventLink(content?.data?.content_event?.link);
      setStartDate(content?.data?.content_event?.from_datetime);
      setEndDate(content?.data?.content_event?.to_datetime);
      const mentorData = {
        label: content?.data?.mentor?.name,
        id: content?.data?.mentor?.id,
      };
      setSelelectedMentor(mentorData);
      if (initialSearchContent === false) {
        // const pathwayContentData = content?.data.content_pathways.map((pathway: any) => ({
        //   name: pathway?.title,
        //   pathway_id: pathway?.id,
        // }));
        const pathwayContentData = content?.data.content_pathways
          .map((path: any) => {
            if (path.type === "html") {
              return {
                html_body: path.html_body,
                type: "html",
              };
            } else {
              return {
                name: path.title,
                pathway_id: path.id,
                type: "content",
              };
            }
          })
          .filter(Boolean);
        setPathwayContent(pathwayContentData);

        pathwayContentData.map((data: any, index: number) => {
          if (data.type === "html") {
            const initialContent = data.html_body || "";
            if (htmlEditors) {
              htmlEditors.setContent(initialContent);
            }
            setHtmlContent((prevHtmlContent: any) => ({ ...prevHtmlContent, [index]: initialContent }));
          }
        });
      }
      const selectKeywords = content?.data.content_keywords.map((keyword: any) => ({
        label: keyword.keyword?.keyword,
        id: keyword?.keyword?.id,
      }));
      setSelectedKeywords(selectKeywords);
      const selectDepartment = content?.data.departments.map((depart: any) => ({
        label: depart.department?.name,
        id: depart?.department?.id,
      }));
      setSelectedDepartment(selectDepartment);
      const selectIndustry = content?.data.industries.map((industry: any) => ({
        label: industry.industry?.name,
        id: industry?.industry?.id,
      }));
      setSelectedIndustry(selectIndustry);
      setValue("title", content?.data.title);
      setValue("description", content?.data.description);
      setValue("category", content?.data?.category?.id);
      setValue("type", content?.data.type);
      setValue("status", content?.data.status);
    }

    if (contents?.data && contents?.data.length > 0) {
      const filteredContents = contents?.data.filter((content: any) => content.type !== "pathway");
      const updatedOptions = filteredContents.map((option: any) => ({
        label: option.title ? option.title : "",
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
    if (userData?.data) {
      const updatedOptions = userData?.data.map((user: any) => ({
        label: user.name,
        id: user.id,
      }));
      setMentorOptions(updatedOptions);
    }
    if (departments?.data) {
      const updatedOptions = departments?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setDepartmentOptions(updatedOptions);
    }
    if (industries?.data) {
      const updatedOptions = industries?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setIndustryOptions(updatedOptions);
    }
  }, [
    editorContent,
    editor,
    oppoEditor,
    oppoEditorContent,
    // htmlEditors,
    // htmlContent,
    contents?.data,
    searchContent,
    content?.data,
    contentDimension?.data,
  ]);

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

  const updatedDimensionData = () => {
    const transformedData = transformedDimensionData();

    const replacementMapping = transformedData.reduce((map: any, item: any) => {
      map[item.dimension_id] = item;
      return map;
    }, {});

    const updatedDimensions = contentDimension?.data.content_dimensions.map((item: any) => ({
      ...item,
      ...replacementMapping[item.dimension_id],
    }));
    return updatedDimensions;
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
      // const thumbnailRes: any = thumbnail && (await fileTrigger({ file: thumbnail }));
      const videoRes: any = file && (await fileTrigger({ file }));

      // if (thumbnailRes) {
      //   setFileUrl(thumbnailRes.data?.data?.file_path);
      // }
      if (videoRes) {
        setVideoUrl(videoRes.data?.data?.file_path);
      }

      if (!videoUrl) {
        setEventError("Video is required!");
        return;
      }
      // if (!fileUrl) {
      //   setEventError("Thumbnail is requried!");
      //   return;
      // }
      const keywords = selectedKeywords.map(item => item.id);
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      const videourl = videoRes ? videoRes?.data?.data?.file_path : videoUrl;
      // const thumbnailurl = thumbnailRes ? thumbnailRes?.data?.data?.file_path : fileUrl;

      postdata = {
        title: data?.title,
        description: data.description,
        type: selectedValue,
        status: selectedStatus,
        category_id: Number(selectCategory),
        image_url: imgurl,
        keywords,
        departments,
        industries,
        content_video: {
          video_url: videourl,
          // thumbnail: thumbnailurl,
        },
      };
      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
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
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: selectedStatus,
        category_id: Number(selectCategory),
        image_url: imgurl,
        keywords,
        departments,
        industries,
        content_event: {
          from_datetime: startDate,
          to_datetime: endDate,
          location: location,
          link: eventLink,
          formconfig_id: selectForm,
        },
      };
      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
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
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: selectedStatus,
        category_id: Number(selectCategory),
        image_url: imgurl,
        keywords,
        departments,
        industries,
        content_article: {
          body: editor.getContent(),
          published_by: author,
          formconfig_id: selectForm,
        },
      };
      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
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
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: selectedStatus,
        category_id: Number(selectCategory),
        image_url: imgurl,
        keywords,
        departments,
        industries,
        content_opportunity: {
          link: link,
          formconfig_id: selectForm,
          location: oppoLocation,
          body: oppoEditor.getContent(),
        },
      };
      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "pathway") {
      // const pathways = pathwayContent.map((path: any) => ({ pathway_id: path.pathway_id }));
      const pathways = pathwayContent.map(item => {
        if (item.name) {
          const { name, ...rest } = item;
          return rest;
        }
        return item;
      });
      if (!pathways[0].pathway_id) {
        setEventError("Please add pathway!");
        return;
      }
      const keywords = selectedKeywords.map(item => item.id);
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: selectedStatus,
        keywords,
        departments,
        industries,
        category_id: Number(selectCategory),
        image_url: imgurl,
        content_pathways: pathways,
      };

      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    } else if (selectedValue === "mentor") {
      if (!selectedMentor) {
        setEventError("Mentor is required!");
        return;
      }
      const keywords = selectedKeywords.map(item => item.id);
      const departments = selectedDepartment.map(item => item.id);
      const industries = selectedIndustry.map(item => item.id);
      const imgurl = imgRes ? imgRes?.data?.data?.file_path : imgUrl;
      postdata = {
        title: data?.title,
        description: data?.description,
        type: selectedValue,
        status: selectedStatus,
        keywords,
        departments,
        industries,
        category_id: Number(selectCategory),
        image_url: imgurl,
        mentor_id: selectedMentor.id,
      };
      if (contentDimension?.data) {
        const data = {
          content_dimensions: updatedDimensionData(),
        };
        await updateContentDimensionTrigger(data);
      } else {
        postdata["content_dimensions"] = transformedDimensionData();
      }
      content?.data ? await updateTrigger(postdata) : await postTrigger(postdata);
    }
    router.push("/admin/contents/content");
  };

  // const handlePhotoChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setThumbnail(file);
  //     const fileURL = URL.createObjectURL(file);
  //     setFileUrl(fileURL);
  //   }
  // };

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
  const handleSelectStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
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
    setInitialSearchContent(true);
    setSearchContent("");
    const updatedOptions = [...pathwayContent, { type: "content", name: "", pathway_id: "" }];
    setPathwayContent(updatedOptions);
  };
  const handleAddHtmlBody = () => {
    const updatedOptions = [...pathwayContent, { type: "html", html_body: "" }];
    setPathwayContent(updatedOptions);
  };

  const handleKeywordChange = (event: any, newValue: any) => {
    setSelectedKeywords(newValue);
  };
  const handleMentorChange = (event: any, newValue: any) => {
    setSelelectedMentor(newValue);
  };

  const handleDepartmentChange = (event: any, newValue: any) => {
    setSelectedDepartment(newValue);
  };
  const handleIndustryChange = (event: any, newValue: any) => {
    setSelectedIndustry(newValue);
  };

  const handleDeletePathway = (indexValue: number) => {
    const updatedFields = pathwayContent.filter((field, index) => index !== indexValue);
    setPathwayContent(updatedFields);
  };

  const handleInputChange = (event: any, newInputValue: any, index: number) => {
    const updatedPathwayContent = [...pathwayContent];
    updatedPathwayContent[index] = { ...updatedPathwayContent[index], name: newInputValue };
    setPathwayContent(updatedPathwayContent);
    setSearchContent(newInputValue);
  };

  const handleInputMentorChange = async (event: any, newInputValue: any) => {
    setSearchMentor(newInputValue);
  };
  const handleSelectPathwayChange = (event: any, newValue: any, index: number) => {
    const updatedPathways = [...pathwayContent];
    updatedPathways[index] = { type: "content", pathway_id: newValue ? newValue.id : "", name: newValue?.label };
    setPathwayContent(updatedPathways);
  };

  const handleCheckboxChange = (event: any, dimension: any) => {
    const { name, checked, value } = event.target;
    // setCheckboxValues((prevValues: any) => ({
    //   ...prevValues,
    //   [Number(dimension)]: {
    //     ...prevValues[dimension],
    //     [name]: checked,
    //   },
    // }));
    if (name === "scores") {
      setCheckboxValues((prevValues: any) => ({
        ...prevValues,
        [Number(dimension)]: {
          ...prevValues[dimension],
          [name]: value, // Set the value for 'scores' name
        },
      }));
    } else {
      setCheckboxValues((prevValues: any) => ({
        ...prevValues,
        [Number(dimension)]: {
          ...prevValues[dimension],
          [name]: checked,
        },
      }));
    }
  };

  const transformedDimensionData = () => {
    const dimensionArray = Object.keys(checkboxValues).map(dimension_id => {
      const dimensionData = checkboxValues[dimension_id];
      const dimension = {
        dimension_id: Number(dimension_id),
        low: dimensionData.low || false,
        medium: dimensionData.medium || false,
        high: dimensionData.high || false,
        scores: parseInt(dimensionData.scores) || 0,
      };
      return dimension;
    });

    return dimensionArray;
  };

  const handleEditorChange = (index: number, content: any) => {
    const updatedContent = [...pathwayContent];
    updatedContent[index].html_body = content;
    setPathwayContent(updatedContent);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="bg-white h-full p-5">
        <div className="rounded-md">
          <div className="mb-10">
            <TextField {...register("title")} label="Title" className="w-full" variant="outlined" />
            <p className="mt-2 text-red-700">{errors.title?.message}</p>
          </div>
          <div className="mb-10">
            <div className="mb-10">
              <TextField
                {...register("description")}
                label="Description"
                multiline
                rows={4}
                className="w-full"
                variant="outlined"
              />
              <p className="mt-2 text-red-700">{errors.description?.message}</p>
            </div>
          </div>
          <div className="mb-10">
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                {...register("category")}
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
          {/* Industry */}
          <div className="my-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={industryOptions || []}
              value={selectedIndustry}
              onChange={handleIndustryChange}
              renderInput={params => <TextField {...params} label="Select Industry" placeholder="Industry" />}
            />
          </div>
          {/* Department */}
          <div className="my-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={departmentOptions || []}
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              renderInput={params => <TextField {...params} label="Career Interest" placeholder="Career Interest" />}
            />
          </div>
          {/* Keywords */}
          <div className="my-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={keywordOptions || []}
              value={selectedKeywords}
              onChange={handleKeywordChange}
              renderInput={params => <TextField {...params} label="Select keywords" placeholder="Keywords" />}
            />
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
          <div className="mb-10">
            <FormControl fullWidth>
              <InputLabel id="selectType">Type</InputLabel>
              <Select
                {...register("type")}
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
                <MenuItem value="mentor">Mentor</MenuItem>
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.type?.message}</p>
          </div>
          {selectedValue === "video" && (
            <>
              <div className="mt-10">
                <div className="border border-dashed w-[30%] flex flex-col items-center justify-center p-10 border-gray-400 rounded-lg">
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
                </div>

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
              {/* <div className="mt-10">
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
                    <Image width={300} height={300} src={fileUrl} alt="File Preview" className="max-w-full h-auto" />
                  </div>
                )}
              </div> */}
            </>
          )}
          {selectedValue === "event" && (
            <>
              <div className="flex mb-10">
                <div className="mr-10">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        // slotProps={{ textField: { size: "small" } }}
                        value={dayjs(startDate)}
                        onChange={handleStartDateChange}
                        label="Start Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        // slotProps={{ textField: { size: "small" } }}
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
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10 ">
                <TextField
                  onChange={e => setEventLink(e.target.value)}
                  value={eventLink}
                  label="Link"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
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
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
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
                {/* <Editor onInit={handleEditorInit} /> */}
                <HtmlEditor handleEditorInit={handleEditorInit} />
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
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <TextField
                  onChange={e => setOppoLocation(e.target.value)}
                  value={oppoLocation}
                  label="Location"
                  className="w-full"
                  variant="outlined"
                />
              </div>
              <div className="mb-10">
                <FormControl fullWidth>
                  <InputLabel id="selectForm">Form</InputLabel>
                  <Select
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
                {/* <Editor onInit={handleOppoEditorInit} /> */}
                <HtmlEditor handleEditorInit={handleOppoEditorInit} />
              </div>
            </>
          )}
          {selectedValue === "pathway" && (
            <>
              <div>
                <MuiButton
                  style={{ textTransform: "none" }}
                  color="error"
                  variant="contained"
                  onClick={handleAddPathway}
                >
                  <AiOutlinePlus size={20} />
                  Add Pathway
                </MuiButton>
                <MuiButton
                  style={{ textTransform: "none", marginLeft: "20px" }}
                  color="error"
                  variant="contained"
                  onClick={handleAddHtmlBody}
                >
                  <AiOutlinePlus size={20} />
                  Add Content
                </MuiButton>
              </div>
              {pathwayContent.map((pathway: any, index: number) => (
                <>
                  {pathway.type === "content" && (
                    <>
                      <div key={index} className="flex items-center gap-4 mt-10">
                        <Autocomplete
                          disablePortal
                          id={`pathway-${index}`}
                          options={contentOptions || []}
                          sx={{ width: 300 }}
                          value={pathway.name}
                          onInputChange={(event, newInputValue) => handleInputChange(event, newInputValue, index)}
                          onChange={(event, newValue) => handleSelectPathwayChange(event, newValue, index)}
                          renderInput={params => <TextField {...params} label="Contents" />}
                        />
                        <AiFillDelete
                          onClick={() => handleDeletePathway(index)}
                          className="cursor-pointer"
                          size={25}
                          color="#d8291c"
                        />
                      </div>
                    </>
                  )}
                  {pathway.type === "html" && (
                    <div key={index} className="mt-5 w-[80%] flex items-center ">
                      {/* <HtmlEditor handleEditorInit={(editor: any) => handleEditorHtmlBody(editor, index)} /> */}
                      <Editor
                        init={(editorInit: any) => handleEditorHtmlBody(editorInit)}
                        value={htmlContent[index] || ""}
                        onEditorChange={content => {
                          setHtmlContent((prevHtmlContent: any) => ({ ...prevHtmlContent, [index]: content }));
                          handleEditorChange(index, content);
                        }}
                      />
                      <AiFillDelete
                        onClick={() => handleDeletePathway(index)}
                        className="cursor-pointer ml-5"
                        size={25}
                        color="#d8291c"
                      />
                    </div>
                  )}
                </>
              ))}
            </>
          )}
          {selectedValue === "mentor" && (
            <>
              <div className="my-10">
                <Autocomplete
                  id="tags-outlined"
                  options={mentorOptions || []}
                  onInputChange={handleInputMentorChange}
                  value={selectedMentor}
                  onChange={handleMentorChange}
                  renderInput={params => <TextField {...params} label="Select Mentor" placeholder="Mentor" />}
                />
              </div>
            </>
          )}
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
            </div>
            {imgUrl && (
              <div className="mt-4">
                <p className="font-bold mb-2">Image Preview:</p>
                <Image width={300} height={300} src={imgUrl} alt="File Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>

          {/* Content Matrix */}
          <div>
            <Box className="flex items-center mt-10 my-3">
              <p className="w-[60%] mr-20"></p>
              <div className="flex">
                <h1 className="font-semibold">High</h1>
                <h1 className="font-semibold mx-2">Medium</h1>
                <h1 className="font-semibold">Low</h1>
                <h1 className="font-semibold ml-2 text-center">Increase skill after 30s</h1>
              </div>
            </Box>
            {dimensions?.data &&
              dimensions?.data.map((dimension: any, index: number) => (
                <Box className="flex  items-center mt-10 my-3" key={index}>
                  <p className="w-[60%] mr-20">{dimension.name}</p>
                  <div className="flex">
                    <Checkbox
                      name="high"
                      checked={checkboxValues[dimension.id]?.high || false}
                      onChange={e => handleCheckboxChange(e, dimension.id)}
                    />
                    <Checkbox
                      name="medium"
                      checked={checkboxValues[dimension.id]?.medium || false}
                      onChange={e => handleCheckboxChange(e, dimension.id)}
                      sx={{ margin: "0px 10px" }}
                    />
                    <Checkbox
                      name="low"
                      checked={checkboxValues[dimension.id]?.low || false}
                      onChange={e => handleCheckboxChange(e, dimension.id)}
                    />
                    {/* <Checkbox
                      sx={{ marginLeft: "60px" }}
                      name="scores"
                      checked={checkboxValues[dimension.id]?.scores || false}
                      onChange={e => handleCheckboxChange(e, dimension.id)}
                    /> */}
                    <div className="ml-2 flex justify-center">
                      <TextField
                        value={checkboxValues[dimension.id]?.scores || ""}
                        name="scores"
                        type={"number"}

                        onChange={e => handleCheckboxChange(e, dimension.id)}
                        id={`scores-${index}`}
                        label="Scores"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </Box>
              ))}
          </div>
          {content?.data.submissions.length > 0 && (
            <div className="my-10">
              <h1 className=" text-lg mb-5 font-semibold">Submissions</h1>
              <SubmissionTable data={content?.data.submissions} />
            </div>
          )}
          {updateError && (
            <Alert severity="error" sx={{ width: "60%", marginTop: "10px" }}>
              {updateError.response.data.message}
            </Alert>
          )}
          {createError && (
            <Alert severity="error" sx={{ width: "60%", marginTop: "10px" }}>
              {createError.response.data.message}
            </Alert>
          )}
          {!updateError && !createError && eventError && <p className="text-red-700 mt-3 mb-3">{eventError}</p>}
          <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
            {content?.data ? (
              <LoadingButton
                loading={fileMutating || updateMutating}
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
                loading={fileMutating || postMutating}
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
