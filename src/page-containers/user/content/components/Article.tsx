"use client";

import { Text } from "@/components/ui/Typo/Text";
import { ContentData } from "@/types/Content";
import { useRouter } from "next/navigation";
import React from "react";
import ContentLayout from "./ContentLayout";
type ArticleProps = {
  data: ContentData;
  contentMutate: any;
};
const Article: React.FC<ArticleProps> = ({ data, contentMutate }) => {
  const router = useRouter();

  return (
    <ContentLayout data={data} contentMutate={contentMutate} type="Article">
      <div className="mt-2 cursor-pointer" onClick={() => router.push(`/articles/${data.slug}`)}>
        {data.content_article && <div>{data.description.slice(0, 300)}...</div>}
        <Text as="span" className="text-primary">
          see more
        </Text>
      </div>
    </ContentLayout>
  );
};

export default Article;
