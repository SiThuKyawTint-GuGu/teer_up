'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';

import Table from '@/components/ui/Table/Table';
import { getToken } from '@/utils/auth';
import { Box } from '@radix-ui/themes';

import { getMethod } from '@/hooks/getMethod';
import { ParamsType } from '@/services/content';
import { ContentResponseData } from '@/types/Content';
import { Columns } from './contentTableColumn';

const Content = () => {
  const [contentData, setContentData] = useState<ContentResponseData[]>([]);
  const [error, setError] = useState<string>('');
  const token = getToken();

  const params: ParamsType = {
    page: 1,
    pageSize: 10,
  };

  // const { data } = useGetContent<ParamsType, ContentResponseData>(params);
  // console.log('data from content', data);

  const getContents = async () => {
    console.log('call api');
    getMethod<any>('/content?page=1&pageSize=10', token)
      .then(response => {
        console.log('get content data......');
        console.log(response.data);
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
        <Table tableColumns={Columns} tableData={contentData} />
        {/* {contentData.length > 0 ? (
        ) : (
          'Loading...'
        )} */}
      </Box>
    </div>
  );
};

export default Content;
