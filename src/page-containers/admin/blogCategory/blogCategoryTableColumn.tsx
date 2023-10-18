"use client";
import { useDeleteBlogCategory, useGetBlogCategory } from "@/services/blogCategory";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Column } from "react-table";

interface DataType {
  id?: string;
}

export const BlogCategoryTableColumn: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "",
    Cell: ({ row }: { row: { original: DataType } }) => {
      const { trigger } = useDeleteBlogCategory(row.original.id || "");
      const { mutate } = useGetBlogCategory();
      const handleDelete = async () => {
        await trigger(null, {
          onSuccess: () => mutate(),
        });
      };
      return (
        <div className="flex justify-center">
          <Link href={`/admin/blogs/category/${row.original.id}`}>
            <AiFillEdit className="cursor-pointer mr-5" size={25} color="gray" />
          </Link>
          <AiFillDelete onClick={handleDelete} className="cursor-pointer" size={25} color="gray" />
        </div>
      );
    },
  },
];
