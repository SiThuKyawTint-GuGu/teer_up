'use client';

import { Text } from '@/components/ui/Typo/Text';
import { useGetBlogBySlug } from '@/services/blog';
import { BlogResponse } from '@/types/Blog';
import { Heading } from '@radix-ui/themes';
import { useParams } from 'next/navigation';

const BlogContent: React.FC = () => {
  const { slug } = useParams();

  const { data: blogData } = useGetBlogBySlug<BlogResponse>(slug.toString());

  console.log(blogData);

  return (
    <div className="grid grid-cols-9">
      <div className="col-start-4 col-span-3">
        <div className="m-5">
          <Heading as="h1" size="6" weight="bold">
            {blogData?.data?.name}
          </Heading>
          <Text dangerouslySetInnerHTML={{ __html: blogData?.data?.name || '' }} />
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
