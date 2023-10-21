"use client";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Inputs/Select";
import { useGetBlogCategory } from "@/services/blogCategory";
import { useGetBlogById, usePostBlog, useUpdateBlog } from "@/services/blogPost";
import { useGetFormConfig, useGetFormConfigById } from "@/services/formConfig";
import "@/styles/checkbox.css";
import "@/styles/radio.css";
import "@/styles/switch.css";
import "@/styles/tab.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Switch from "@radix-ui/react-switch";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  link: yup.string().required("Link is required!"),
});

const BlogPostDetail = ({ id }: Props) => {
  const router = useRouter();
  const { trigger: postTrigger } = usePostBlog();
  const { trigger: updateTrigger } = useUpdateBlog();
  const { data: categories } = useGetBlogCategory<any>();
  const { data: formconfigs } = useGetFormConfig<any>();

  const { data: blog } = useGetBlogById<any>(id);
  const { data: inputForms } = useGetFormConfigById<any>(
    blog?.data ? blog.data.formconfig_id : null
  );
  // console.log("blog by id", inputForms);

  const editorRef = useRef<any>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectFormName, setSelectFormName] = useState<string>();
  const [selectFormValue, setSelectFormValue] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<any>("");
  const [editor, setEditor] = useState<any>(null);

  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
  };

  useEffect(() => {
    if (editor) {
      editor.setContent(editorContent);
    }
    if (blog?.data) {
      setSelectedValue(blog?.data.category_id);
      setSelectedName(blog?.data.category.name);
      setSelectFormName(blog.data.form_config.name);
      setSelectFormValue(blog.data.formconfig_id);
      setIsSwitchOn(blog.data.is_public);
      setEditorContent(blog?.data.content);
    }
  }, [editor, editorContent, blog?.data]);

  const form = useForm<{ name: string; link: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: blog?.data.name || undefined,
      link: blog?.data.link || undefined,
    },
  });

  const handleSelectChange = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    const selectItem = categories?.data.find((cat: any) => cat.id === Number(selectedValue));
    setSelectedName(selectItem.name);
  };
  const handleFormSelectChange = (selectedValue: string) => {
    setSelectFormValue(selectedValue);
    const selectItem = formconfigs?.data.find((cat: any) => cat.id === Number(selectedValue));
    setSelectFormName(selectItem.name);
  };

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const submit = async (data: any) => {
    if (editor?.getContent()) {
      console.log("no content");
    }
    if (data.name && data.link) {
      const submitData = {
        name: data.name,
        link: data.link,
        is_public: isSwitchOn,
        category_id: Number(selectedValue),
        content: editor.getContent(),
        formconfig_id: Number(selectFormValue),
      };
      console.log("submit data", submitData);
      if (blog?.data) {
        await updateTrigger(submitData);
      } else {
        await postTrigger(submitData);
      }
      router.push("/admin/blogs/posts");
    }
  };

  return (
    <>
      <div className="bg-white p-10 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <InputText placeholder="Enter Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <InputText placeholder="Enter Link" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mb-10">
              <p className="mb-10">Select Category</p>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                  {selectedName || "Category"}
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories?.data &&
                    categories?.data.map((cat: any, index: number) => (
                      <SelectItem key={index} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-10">
              <p className="mb-10">Select Form</p>
              <Select onValueChange={handleFormSelectChange}>
                <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                  {selectFormName || "Form"}
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {formconfigs?.data &&
                    formconfigs?.data.map((cat: any, index: number) => (
                      <SelectItem key={index} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-10 mt-5">
              <form>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Switch.Root
                    className="SwitchRoot mr-3"
                    id="airplane-mode"
                    checked={isSwitchOn}
                    onCheckedChange={handleSwitchToggle}
                  >
                    <Switch.Thumb className="SwitchThumb" />
                  </Switch.Root>
                  <label className="Label" htmlFor="airplane-mode">
                    Visible to Public
                  </label>
                </div>
              </form>
            </div>

            <div className="mb-10">
              <p className="font-weight-600 mb-3">Content</p>
              <Editor onInit={handleEditorInit} />
            </div>

            {blog?.data && inputForms?.data && (
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
                                          <label
                                            key={index}
                                            className="Label"
                                            htmlFor={option.label}
                                          >
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
            )}
            <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
              <Button
                onClick={submit}
                className="p-2 mt-[50px] rounded-md w-[15%] text-white cursor-pointer"
                type="submit"
              >
                {blog?.data ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BlogPostDetail;
