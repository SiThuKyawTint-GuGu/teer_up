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
        className="mt-2 w-full cursor-pointer h-full"
        onClick={() => router.push(`/articles/${data.slug}`)}
      >
        <Text>
          {data.description.slice(0, 100)}{" "}
          <Text as="span" className="text-primary">
            See more
          </Text>
        </Text>

        <Text as="span" className="text-primary">
          See more
        </Text>
      </div>
    </ContentLayout>
  );
};

export default Article;
