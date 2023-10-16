'use client';
import { useDeleteFormConfig, useGetFormConfig } from '@/services/formConfig';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Column } from 'react-table';

interface FormConfigDataType {
  id?: string;
  name?: string;
}

export const Columns: Column[] = [
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
    Cell: ({ row }: { row: { original: FormConfigDataType } }) => {
      const { trigger } = useDeleteFormConfig(row.original.id || '');
      const { mutate } = useGetFormConfig();
      const handleDelete = async () => {
        await trigger(null, {
          onSuccess: () => {
            mutate();
          },
        });
      };
      return (
        <div className="flex justify-center">
          <Link href={`/admin/form/${row.original.id}`}>
            <AiFillEdit className="cursor-pointer mr-5" size={25} color="gray" />
          </Link>
          <AiFillDelete onClick={handleDelete} className="cursor-pointer" size={25} color="gray" />
        </div>
      );
    },
  },
];
