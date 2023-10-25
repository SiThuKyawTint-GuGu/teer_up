"use client";

import { Button } from "@/components/ui/Button";
import { ContentData } from "@/types/Content";
import { Text } from "@radix-ui/themes";
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
              <Text>
                {data.description.slice(0, 100)}{" "}
                <Text as="span" className="text-primary">
                  See more
                </Text>
              </Text>
            </div>
          </div>
        )}
        <Button>Apply Now</Button>
      </div>
    </ContentLayout>
  );
};

export default Opportunity;
