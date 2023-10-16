'use client';

import CardBox from '@/components/ui/Card';
import { Text } from '@/components/ui/Typo/Text';
import { useGetBlogBySlug } from '@/services/blog';
import { BlogResponse } from '@/types/Blog';
import { Heading } from '@radix-ui/themes';
import { useParams } from 'next/navigation';

const BlogContent: React.FC = () => {
  const { slug } = useParams();
  const { data: blogData } = useGetBlogBySlug<BlogResponse>(slug.toString());

  return (
    <>
      <div className="bg-[#f3f3f3] h-screen">
        <div className="grid grid-cols-9">
          <div className="col-start-4 col-span-3">
            <CardBox className="bg-white m-5 p-5">
              <Heading as="h1" size="6" weight="bold">
                {blogData?.data?.name}
              </Heading>
              <Text dangerouslySetInnerHTML={{ __html: blogData?.data?.name || '' }} />
            </CardBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogContent;
