"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typo/Text";
import { ContentData } from "@/types/Content";
import { useRouter } from "next/navigation";
import React from "react";
import ContentLayout from "./ContentLayout";

type OpportunityProps = {
  data: ContentData;
  contentMutate: any;
};

const Opportunity: React.FC<OpportunityProps> = ({ data, contentMutate }) => {
  const router = useRouter();
  return (
    <ContentLayout data={data} contentMutate={contentMutate}>
      <div
        className="mt-2 cursor-pointer h-full flex justify-between flex-col"
        onClick={() => router.push(`/opportunity/${data.slug}`)}
      >
        {data.description && (
          <div className="flex flex-col">
            <div className="w-full">
              {(() => {
                const temporaryDiv = document.createElement("div");
                temporaryDiv.innerHTML = data.description && data.description.toString();
                if (!temporaryDiv.textContent) return "";
                if (temporaryDiv.textContent.length > 300)
                  return temporaryDiv.textContent.substring(0, 300) + "...";
                return temporaryDiv.textContent;
              })()}
            </div>
            <Text as="span" className="text-primary">
              See more
            </Text>
          </div>
        )}

        <Button>Apply Now</Button>
      </div>
    </ContentLayout>
  );
};

export default Opportunity;
