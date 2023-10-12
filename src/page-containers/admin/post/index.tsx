import React from 'react';
import Link from 'next/link';
import { AiFillPlusSquare } from 'react-icons/ai';

import Table from '@/components/ui/Table/Table';
import { Box } from '@radix-ui/themes';

import { Columns } from './postTableColumns';

const fadeData = [
  {
    id: '34324safasfsdf',
    name: 'khin',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    id: '43fsfsdfef',
    name: 'pyae',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
];
const Post = () => {
  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Blogs</p>
          <Link href={'/admin/blogs/posts/0'}>
            <AiFillPlusSquare
              color="gray"
              size={25}
              className="cursor-pointer hover:text-gray-900"
            />
          </Link>
        </div>
        <Table tableColumns={Columns} tableData={fadeData} />
      </Box>
    </>
  );
};

export default Post;
