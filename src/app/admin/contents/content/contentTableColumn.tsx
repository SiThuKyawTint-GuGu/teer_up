"use client";
import dayjs from "dayjs";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import { Column } from "react-table";

interface ContentDataType {
  id?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name: string;
  };
}

const handleDelete = (id: string) => {
  console.log(id);
};

export const Columns: Column[] = [
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      return (
        <Link className="text-blue-600" href={`/admin/contents/content/${row.original.id}`}>
          {row.original.title}
        </Link>
      );
    },
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Photo URL",
    accessor: "photo_url",
    // Cell: ({ row }) => {
    //   return (
    //     <Link className="text-blue" href={`/admin/contents/content/${row.original.id}`}>
    //       link
    //     </Link>
    //   );
    // },
  },
  {
    Header: "Video URL",
    accessor: "video_url",
  },
  {
    Header: "User Id",
    accessor: "userId",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { createdAt } = row.original;

      if (!createdAt) {
        return null; // Return null if createdAt is null
      }

      return <p>{dayjs(createdAt).format("D/M/YYYY")}</p>;
    },
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { updatedAt } = row.original;

      if (!updatedAt) {
        return null; // Return null if createdAt is null
      }

      return <p>{dayjs(updatedAt).format("D/M/YYYY")}</p>;
    },
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { user } = row.original;

      if (!user) {
        return null;
      }

      return <p>{user.name}</p>;
    },
  },
  {
    Header: "Action",
    accessor: "",
    Cell: ({ row }: { row: { original: ContentDataType } }) => (
      <div>
        <AiFillDelete
          onClick={() => handleDelete(row.original.id || "")}
          className="cursor-pointer"
          size={25}
          color="gray"
        />
      </div>
    ),
  },
];
