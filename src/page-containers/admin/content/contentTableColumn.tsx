'use client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Column } from 'react-table';

interface ContentDataType {
  id?: string;
  title?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    name: string;
  };
  content_video?: {
    video_url?: string;
  };
}

const handleDelete = (id: string) => {
  console.log(id);
};

export const Columns: Column[] = [
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Image URL',
    accessor: 'image_url',
    // Cell: ({ row }) => {
    //   return (
    //     <Link className="text-blue" href={`/admin/contents/content/${row.original.id}`}>
    //       link
    //     </Link>
    //   );
    // },
  },
  {
    Header: 'Video URL',
    accessor: 'video_url',
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { content_video } = row.original;

      if (!content_video?.video_url) {
        return null; // Return null if createdAt is null
      }

      return <p>{content_video.video_url}</p>;
    },
  },
  {
    Header: 'User Id',
    accessor: 'userId',
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { created_at } = row.original;

      if (!created_at) {
        return null; // Return null if createdAt is null
      }

      return <p>{dayjs(created_at).format('D/M/YYYY')}</p>;
    },
  },
  {
    Header: 'Updated At',
    accessor: 'updated_at',
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { updated_at } = row.original;

      if (!updated_at) {
        return null; // Return null if createdAt is null
      }

      return <p>{dayjs(updated_at).format('D/M/YYYY')}</p>;
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }: { row: { original: ContentDataType } }) => {
      const { user } = row.original;

      if (!user) {
        return null;
      }

      return <p>{user.name}</p>;
    },
  },
  {
    Header: 'Action',
    accessor: '',
    Cell: ({ row }: { row: { original: ContentDataType } }) => (
      <div>
        <Link className="text-blue-600" href={`/admin/contents/content/${row.original.id}`}>
          <AiFillEdit className="cursor-pointer mr-5" size={25} color="gray" />
        </Link>
        <AiFillDelete
          onClick={() => handleDelete(row.original.id || '')}
          className="cursor-pointer"
          size={25}
          color="gray"
        />
      </div>
    ),
  },
];
