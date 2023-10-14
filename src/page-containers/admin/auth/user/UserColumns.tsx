import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { Icons } from '@/components/ui/Images';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Column } from 'react-table';
import UserUpdateForm from '../components/UserUpdateForm';

export const UserColumns: Column[] = [
  {
    Header: 'User name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Verified',
    accessor: 'verified',
    Cell: ({ value }) => <div>{value.toString()}</div>,
  },
  {
    Header: 'Updated Date',
    accessor: 'updated_at',
    Cell: ({ value }) => <div>{dayjs(value).format('DD-MM-YYYY')}</div>,
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ({ row }) => {
      const { id } = row.original as any;
      const [open, setOpen] = useState<boolean>(false);
      return (
        <>
          <Dialog open={open} onOpenChange={val => setOpen(val)}>
            <div className="flex justify-start items-center gap-3">
              <DialogTrigger>
                <div>
                  <Icons.edit className="w-[20px] h-[20px]" />
                </div>
              </DialogTrigger>
              <DialogTrigger>
                <div>
                  <Icons.delete className="w-[20px] h-[20px]" />
                </div>
              </DialogTrigger>
            </div>
            <DialogContent className="bg-white">
              <UserUpdateForm row={row.original} userId={id} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
