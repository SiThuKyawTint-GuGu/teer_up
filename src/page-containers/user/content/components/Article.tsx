"use client";

import { Button } from "@/components/ui/Button";

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
      <>
        <Button onClick={() => router.push(`/articles/${data.slug}`)}>Go to detail page</Button>
        {data.content_article && (
          <div dangerouslySetInnerHTML={{ __html: data.content_article.article_body }} />
        )}
      </>
      s
    </ContentLayout>
  );
};

export default Article;
