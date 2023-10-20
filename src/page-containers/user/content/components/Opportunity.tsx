import { Button } from "@/components/ui/Button";
import { ContentData } from "@/types/Content";
import React from "react";
import ContentLayout from "./ContentLayout";

type OpportunityProps = {
  data: ContentData;
  contentMutate: any;
};

const Opportunity: React.FC<OpportunityProps> = ({ data, contentMutate }) => {
  return (
    <ContentLayout contentMutate={contentMutate} data={data} type="Opportunity">
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-between">
          <div>Hello</div>
          <Button>Apply now</Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Opportunity;
