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
    <ContentLayout data={data} contentMutate={contentMutate}>
      <div
        className="mt-2 w-full cursor-pointer"
        onClick={() => router.push(`/articles/${data.slug}`)}
      >
        {data.content_article && (
          <div>
            {/* {(() => {
              const temporaryDiv = document.createElement("div");

              temporaryDiv.innerHTML =
                data.content_article && data.content_article.article_body.toString();
              if (!temporaryDiv.textContent) return "";
              if (temporaryDiv.textContent.length > 100)
                return temporaryDiv.textContent.substring(0, 100) + "...";
              return temporaryDiv.textContent;
            })()} */}
          </div>
        )}

        <Text as="span" className="text-primary">
          See more
        </Text>
      </div>
    </ContentLayout>
  );
};

export default Article;
