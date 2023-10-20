import { ContentData } from "@/types/Content";
import React from "react";
import ContentLayout from "./ContentLayout";
type ArticleProps = {
  data: ContentData;
  contentMutate: any;
};
const Article: React.FC<ArticleProps> = ({ data, contentMutate }) => {
  return (
    <ContentLayout data={data} contentMutate={contentMutate} type="Article">
      {data.content_article && (
        <div dangerouslySetInnerHTML={{ __html: data.content_article.article_body }} />
      )}
    </ContentLayout>
  );
};

export default Article;
