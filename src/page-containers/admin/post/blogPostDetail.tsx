"use client";
import { useGetBlogCategory } from "@/services/blogCategory";
import { useGetBlogById, usePostBlog, useUpdateBlog } from "@/services/blogPost";
import { useGetFormConfig, useGetFormConfigById } from "@/services/formConfig";
import "@/styles/checkbox.css";
import "@/styles/radio.css";
import "@/styles/tab.css";
import { yupResolver } from "@hookform/resolvers/yup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { Editor } from "@tinymce/tinymce-react";
import copy from "copy-to-clipboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  link: yup.string().required("Link is required!"),
  category: yup.string().required("Please select category!"),
  form: yup.string().required("Please select form!"),
});

const BlogPostDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: postTrigger, isMutating: postMutating, error: postError } = usePostBlog();
  const { trigger: updateTrigger, isMutating: updateMutating, error: updateError } = useUpdateBlog(id);
  const { data: categories } = useGetBlogCategory<any>();
  const { data: formconfigs } = useGetFormConfig<any>();

  const { data: blog } = useGetBlogById<any>(id);
  const { data: inputForms } = useGetFormConfigById<any>(blog?.data ? blog.data.formconfig_id : null);
  // console.log("blog by id", blog);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectFormValue, setSelectFormValue] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<any>("");
  const [editor, setEditor] = useState<any>(null);
  const [contentError, setContentError] = useState<string>("");
  const [blogLink, setBlogLink] = useState<string>("");

  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (editor) {
      editor.setContent(editorContent);
    }
    if (blog?.data) {
      setSelectedValue(blog?.data.category_id);
      setSelectFormValue(blog.data.formconfig_id);
      setIsSwitchOn(blog.data.is_public);
      setEditorContent(blog?.data.content);
      setBlogLink(blog?.data.link);
      setValue("name", blog?.data.name);
      setValue("link", blog?.data.link);
      setValue("category", blog?.data.category_id);
      setValue("form", blog?.data.formconfig_id);
    }
  }, [editor, editorContent, blog?.data]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };
  const handleFormSelectChange = (event: SelectChangeEvent) => {
    setSelectFormValue(event.target.value);
  };

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const submit = async (data: any) => {
    if (!editor?.getContent()) {
      setContentError("Content is required!");
      return;
    }
    const submitData = {
      name: data.name,
      link: data.link,
      is_public: isSwitchOn,
      category_id: Number(data.category),
      content: editor.getContent(),
      formconfig_id: Number(data.form),
    };
    // console.log("submit data", submitData);
    if (blog?.data) {
      await updateTrigger(submitData);
    } else {
      await postTrigger(submitData);
    }
    router.push("/admin/blogs/posts");
  };

  return (
    <>
      <div className="bg-white p-10 rounded-md">
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div>
            <TextField {...register("name")} label="Name" className="w-full" variant="outlined" />
            <p className="mt-2 text-red-700">{errors.name?.message}</p>
          </div>
          <div>
            <FormControl disabled={blog?.data ? true : false} className="w-full" variant="outlined">
              <InputLabel htmlFor="link">Link</InputLabel>
              <OutlinedInput
                id="link"
                {...register("link")}
                endAdornment={
                  <InputAdornment position="end">
                    {blog?.data ? (
                      <IconButton onClick={() => copy(blogLink)} edge="end">
                        <ContentCopyIcon />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                }
                label="Link"
              />
            </FormControl>
            <p className="mt-2 text-red-700">{errors.link?.message}</p>
          </div>

          <div className="mb-10">
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                {...register("category")}
                labelId="category"
                id="category"
                value={selectedValue}
                label="Category"
                onChange={handleSelectChange}
              >
                {categories?.data.map((cat: any, index: number) => (
                  <MenuItem key={index} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.category?.message}</p>
          </div>
          <div className="mb-10">
            <FormControl fullWidth>
              <InputLabel id="form">Form</InputLabel>
              <Select
                {...register("form")}
                labelId="form"
                id="form"
                value={selectFormValue}
                label="Category"
                onChange={handleFormSelectChange}
              >
                {formconfigs?.data.map((formconfig: any, index: number) => (
                  <MenuItem key={index} value={formconfig.id}>
                    {formconfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.form?.message}</p>
          </div>
          <div className="mb-10 mt-5">
            <FormControlLabel
              control={<Switch checked={isSwitchOn} onChange={handleSwitchToggle} color="error" />}
              sx={{ fontSize: "15px", color: "gray" }}
              label="Visible to Public"
            />
          </div>

          <div className="mb-10">
            <p className="font-weight-600 mb-3">Content</p>
            <Editor onInit={handleEditorInit} />
            {contentError && <p className="mt-2 text-red-700">{contentError}</p>}
          </div>
          <div>
            {postError && (
              <Alert severity="error" sx={{ width: "60%" }}>
                {postError?.response.data.message}
              </Alert>
            )}
            {updateError && (
              <Alert severity="error" sx={{ width: "60%" }}>
                {updateError?.response.data.message}
              </Alert>
            )}
          </div>

          {/* {blog?.data && inputForms?.data && (
            <>
              <h1 className="mb-5">{blog?.data.form_config.name}</h1>
              {inputForms.data.formdetails_configs.length > 0 &&
                inputForms.data.formdetails_configs.map((field: any, index: number) => (
                  <>
                    <div key={index}>
                      {(field.input_config.type === "text" ||
                        field.input_config.type === "Text" ||
                        field.input_config.type === "email" ||
                        field.input_config.type === "phone" ||
                        field.input_config.type === "number") && (
                        <div className="my-2">
                          <p className="font-weight-500 text-sm mb-2">
                            {field.input_config.name}
                            {field.required === true ? "*" : ""}
                          </p>
                          <div className="flex">
                            <fieldset className="Fieldset mb-10">
                              <input
                                className="Input"
                                type={field.input_config.type === "number" ? "number" : "text"}
                                placeholder={field.input_config.placeholder}
                              />
                            </fieldset>
                          </div>
                        </div>
                      )}
                      {field.input_config.type === "radio" &&
                        field.input_config.input_options.length > 0 && (
                          <div className="my-4">
                            <p className="text-sm">{field.input_config.name}</p>
                            <form>
                              <RadioGroup.Root
                                className="RadioGroupRoot"
                                defaultValue="default"
                                aria-label="View density"
                              >
                                <div
                                  className="my-2"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    // justifyContent: "center",
                                  }}
                                >
                                  {field.input_config.input_options.map(
                                    (option: any, index: number) => (
                                      <div
                                        key={index}
                                        style={{
                                          display: "flex",
                                          margin: "10px",
                                          alignItems: "center",
                                          marginRight: "16px",
                                        }}
                                      >
                                        <RadioGroup.Item
                                          key={index}
                                          className="RadioGroupItem"
                                          value={option.value}
                                          id={option.label}
                                        >
                                          <RadioGroup.Indicator className="RadioGroupIndicator" />
                                        </RadioGroup.Item>
                                        <label key={index} className="Label" htmlFor={option.label}>
                                          {option.label}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </RadioGroup.Root>
                            </form>
                          </div>
                        )}
                      {field.input_config.type === "dropdown" &&
                        field.input_config.input_options.length > 0 && (
                          <>
                            <p className="text-sm my-4 mb-2">{field.input_config.name}</p>
                            <Select onValueChange={handleSelectChange}>
                              <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                                {field.input_config.placeholder}
                              </SelectTrigger>

                              <SelectContent className="bg-white">
                                {field.input_config.input_options.map(
                                  (dropdown: any, index: number) => (
                                    <SelectItem key={index} value={dropdown.value}>
                                      {dropdown.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </>
                        )}

                      {field.input_config.type === "checkbox" && (
                        <div className="my-3">
                          <p className="my-2">{field.input_config.name}</p>
                          <form>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                                <Checkbox.Indicator className="CheckboxIndicator">
                                  <AiOutlineCheck size={25} className="text-red-700" />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                              <label className="Label" htmlFor="c1">
                                {field.input_config.placeholder}
                              </label>
                            </div>
                          </form>
                        </div>
                      )}
                      {field.input_config.type === "date" && (
                        <>
                          <p className="my-3">{field.input_config.name}</p>
                          <div className="border p-2 border-red-700">
                            <DatePicker
                              selected={new Date()}
                              onChange={date => console.log(date)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ))}
            </>
          )} */}
          <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
            {blog?.data ? (
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
        </form>
      </div>
    </>
  );
};

export default BlogPostDetail;
