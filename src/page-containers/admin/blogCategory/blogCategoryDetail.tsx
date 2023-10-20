"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import {
  useGetBlogCategoryById,
  usePostBlogCategory,
  useUpdateBlogCategory,
} from "@/services/blogCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {
  id: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
});

const BlogCategoryDetail = ({ id }: Props) => {
  const router = useRouter();
  const { data: category } = useGetBlogCategoryById<any>(id);
  // console.log("category", category);
  const { trigger } = useUpdateBlogCategory();
  const { trigger: postBlogCategoryTrigger } = usePostBlogCategory();

  const form = useForm<{ name: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: category?.data.name || undefined,
    },
  });

  const submit = async (data: any) => {
    const submitData = {
      name: data?.name,
    };
    if (id != "0") {
      await trigger(submitData);
    } else {
      await postBlogCategoryTrigger(submitData);
    }
    router.push("/admin/blogs/category");
  };
  return (
    <>
      <div className="h-screen">
        <Box className="bg-white p-10 rounded-md">
          <h1 className="mb-10">Blog Category Detail</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <InputText placeholder="Category Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <div></div>
                <Button className="p-2 mt-[50px] rounded-md w-[10%] text-white" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Box>
      </div>
    </>
  );
};

export default BlogCategoryDetail;
