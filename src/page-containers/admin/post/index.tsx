"use client";
import Link from "next/link";

import Table from "@/components/ui/Table/Table";
import { Box } from "@radix-ui/themes";

import { Button } from "@/components/ui/Button";
import { useGetBlogs } from "@/services/blogPost";
import { AiOutlinePlus } from "react-icons/ai";
import { Columns } from "./postTableColumns";

const Post = () => {
  const { data: blogs, isLoading, error } = useGetBlogs<any>();
  // console.log("get blogs", blogs);

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Blogs</p>
          <Link href={"/admin/blogs/posts/0"}>
            <Button className="p-2 mb-5 rounded-md w-full text-white" type="submit">
              Create new blog <AiOutlinePlus color="white" size={20} />
            </Button>
          </Link>
        </div>
        {blogs?.data && <Table tableColumns={Columns} tableData={blogs?.data || []} />}
      </Box>
    </>
  );
};

export default Post;
