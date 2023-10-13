'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';

import Table from '@/components/ui/Table/Table';
import { getMethod } from '@/hooks/getMethod';
import { getToken } from '@/utils/auth';
import { Box } from '@radix-ui/themes';

import { ParamsType, useGetContent } from '@/services/content';
import { ContentResponseData } from '@/types/Content';
import { Columns } from './contentTableColumn';

const ContentPage = () => {
  const [contentData, setContentData] = useState<ContentResponseData[]>([]);
  const [error, setError] = useState<string>('');
  const token = getToken();

  const params: ParamsType = {
    page: 1,
    pageSize: 10,
  };

  const { data } = useGetContent<ParamsType, ContentResponseData>(params);
  console.log('data from content', data);

  const getContents = async () => {
    getMethod<any>('/content?page=1&pageSize=20', token)
      .then(response => {
        console.log('get content data......');
        // console.log(response.data);
        setContentData(response.data);
        // setError(null);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
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
        {contentData.length > 0 ? (
          <Table tableColumns={Columns} tableData={contentData} />
        ) : (
          'Loading...'
        )}
      </Box>
    </div>
  );
};

export default ContentPage;
