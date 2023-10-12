'use client';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';
import { Column } from 'react-table';

interface PostDataType {
  id?: string;
  link?: string;
}

export const Columns: Column[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Link',
    accessor: 'link',
    Cell: ({ row }: { row: { original: PostDataType } }) => {
      return (
        <Link className="text-blue" href={`/admin/blogs/posts/${row.original.id}`}>
          link
        </Link>
      );
    },
  },
  {
    Header: 'Video to Public',
    accessor: 'video_to_public',
    // Cell: ({ value }) => (
    //   <div
    //     className={
    //       value === 'true' ? 'bg-[#dcfce7] bold text-gray-700 rounded text-center' : 'bg-red-600'
    //     }
    //   >
    //     {value}
    //   </div>
    // ),
  },
  {
    Header: 'Action',
    accessor: '',
    Cell: () => (
      <div>
        <AiFillDelete className="cursor-pointer" size={25} color="gray" />
      </div>
    ),
  },
];
