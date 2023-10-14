'use client';
import Link from 'next/link';
import { AiFillPlusSquare } from 'react-icons/ai';

import { Box } from '@radix-ui/themes';

import Table from '@/components/ui/Table/Table';
import { ParamsType, useGetContent } from '@/services/content';
import { ContentResponseData } from '@/types/Content';
import { Columns } from './contentTableColumn';

const Content = () => {
  const params: ParamsType = {
    page: 1,
    pageSize: 10,
  };

  const { data, isLoading, error } = useGetContent<ParamsType, ContentResponseData>(params);
  // console.log('data from content', data?.data);

  if (isLoading) return <p>Loading...</p>;

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
        <Table tableColumns={Columns} tableData={data?.data || []} />
      </Box>
    </div>
  );
};

export default Content;
