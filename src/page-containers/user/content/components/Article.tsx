import { ContentData } from '@/types/Content';
import { useRouter } from 'next/navigation';
import React from 'react';
type ArticleProps = {
  data: ContentData;
};
const Article: React.FC<ArticleProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push(`/articles/${data.slug}`)}>
        Go To Article Page- {data.title}
      </button>
    </div>
  );
};

export default Article;
