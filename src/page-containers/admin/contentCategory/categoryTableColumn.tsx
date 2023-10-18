'use client';
import { useDeleteContentCategory } from '@/services/contentCategory';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Column } from 'react-table';

interface DataType {
  id?: string;
}

export const CategoryTableColumn: Column[] = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Action',
    accessor: '',
    Cell: ({ row }: { row: { original: DataType } }) => {
      const { trigger } = useDeleteContentCategory(Number(row.original.id));
      const handleDelete = async () => {
        await trigger();
      };
      return (
        <div className="flex justify-center">
          <Link href={`/admin/contents/category/${row.original.id}`}>
            <AiFillEdit className="cursor-pointer mr-5" size={25} color="gray" />
          </Link>
          <AiFillDelete onClick={handleDelete} className="cursor-pointer" size={25} color="gray" />
        </div>
      );
    },
  },
];
