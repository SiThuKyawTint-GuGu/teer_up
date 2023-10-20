import { Button } from "@/components/ui/Button";
import { ContentData } from "@/types/Content";
import React from "react";
import ContentLayout from "./ContentLayout";
type EventProps = {
  data: ContentData;
  contentMutate: any;
};
const Event: React.FC<EventProps> = ({ data, contentMutate }) => {
  return (
    <ContentLayout contentMutate={contentMutate} data={data} type="Event">
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-between">
          <div>Hello</div>
          <Button>Join Now</Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Event;
