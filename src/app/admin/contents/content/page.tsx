'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiFillPlusSquare } from 'react-icons/ai';

import Table from '@/components/ui/Table/Table';
import { getMethod } from '@/hooks/getMethod';
import { getToken } from '@/utils/auth';
import { Box } from '@radix-ui/themes';

import { Columns } from './contentTableColumn';
const token: string = getToken();

const fadeData = [
  {
    id: 'd2311a6e-9b35-4dd9-ae82-18e214fa9c8c',
    title: 'HELLO WORLD TITLE',
    description: 'Test video 1',
    photo_url: 'https://teeup-dev.s3.amazonaws.com/1697007797532-78246051-demoimage1.jpeg',
    video_url: '',
    createdAt: '2023-10-11T07:11:19.070Z',
    updatedAt: '2023-10-11T07:11:19.070Z',
    userId: '1abd48dd-b67c-4802-b378-ea4d3fce76e2',
    user: {
      name: 'jojo',
    },
  },
];

const ContentPage = () => {
  const getContents = async () => {
    console.log('call api');
    getMethod<any>('/content?page=1&pageSize=20', token)
      .then(data => {
        console.log('get content data......');
        console.log({ data });
        // setError(null);
      })
      .catch(error => {
        // setError(error.message);
      });
  };

  useEffect(() => {
    getContents();
  }, []);
  return (
    <div>
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Contents</p>
          <Link href={'/admin/contents/content/0'}>
            <AiFillPlusSquare
              color="gray"
              size={25}
              className="cursor-pointer hover:text-gray-900"
            />
          </Link>
        </div>
        <Table tableColumns={Columns} tableData={fadeData} />
      </Box>
    </div>
  );
};

export default ContentPage;
