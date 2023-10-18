"use client";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { useGetBlogCategory } from "@/services/blogCategory";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { BlogCategoryTableColumn } from "./blogCategoryTableColumn";

const BlogCategory = () => {
  const {
    data: contentCategories,
    isLoading,
    error,
  } = useGetBlogCategory<ContentCategoryResponse>();

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {error && <p>{error}</p>}
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Blog Category</p>
          <Link href={"/admin/blogs/category/0"}>
            <Button className="p-2 mb-5 rounded-md w-full text-white" type="submit">
              Create new catetory <AiOutlinePlus color="white" size={20} />
            </Button>
          </Link>
        </div>
        {contentCategories?.data && (
          <Table tableColumns={BlogCategoryTableColumn} tableData={contentCategories?.data} />
        )}
      </Box>
    </>
  );
};

export default BlogCategory;
