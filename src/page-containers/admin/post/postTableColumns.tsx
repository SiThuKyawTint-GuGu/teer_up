"use client";
import { useDeleteBlog, useGetBlogs } from "@/services/blogPost";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Column } from "react-table";

interface PostDataType {
  id?: string;
  link?: string;
  is_public?: boolean;
}

export const Columns: Column[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Content",
    accessor: "content",
  },
  {
    Header: "Link",
    accessor: "link",
    // Cell: ({ row }: { row: { original: PostDataType } }) => {
    //   return (
    //     <Link className="text-blue" href={`/admin/blogs/posts/${row.original.id}`}>
    //       link
    //     </Link>
    //   );
    // },
  },
  {
    Header: "Public",
    accessor: "is_public",
    Cell: ({ row }: { row: { original: PostDataType } }) => {
      return <p>{row.original.is_public === true ? "true" : "false"}</p>;
    },
  },
  {
    Header: "Action",
    accessor: "",
    Cell: ({ row }: { row: { original: PostDataType } }) => {
      const { trigger } = useDeleteBlog(row.original.id || "");
      const { mutate } = useGetBlogs();
      const handleDelete = async () => {
        await trigger(null, {
          onSuccess: () => {
            mutate();
          },
        });
      };
      return (
        <div className="flex">
          <Link href={`/admin/blogs/posts/${row.original.id}`}>
            <AiFillEdit className="cursor-pointer mr-5" size={25} color="gray" />
          </Link>
          <AiFillDelete onClick={handleDelete} className="cursor-pointer" size={25} color="gray" />
        </div>
      );
    },
  },
];
