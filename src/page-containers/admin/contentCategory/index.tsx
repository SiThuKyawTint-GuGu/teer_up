'use client';
import Table from '@/components/ui/Table/Table';
import { useGetContentCategory } from '@/services/contentCategory';
import { ContentCategoryResponse } from '@/types/ContentCategory';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillPlusSquare } from 'react-icons/ai';
import { CategoryTableColumn } from './categoryTableColumn';

const Category = () => {
  const {
    data: contentCategories,
    isLoading,
    error,
  } = useGetContentCategory<ContentCategoryResponse>();

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {error && <p>{error}</p>}
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Content Category</p>
          <Link href={'/admin/contents/category/0'}>
            <AiFillPlusSquare
              color="gray"
              size={25}
              className="cursor-pointer hover:text-gray-900"
            />
          </Link>
        </div>
        {contentCategories?.data && (
          <Table tableColumns={CategoryTableColumn} tableData={contentCategories?.data} />
        )}
      </Box>
    </>
  );
};

export default Category;
