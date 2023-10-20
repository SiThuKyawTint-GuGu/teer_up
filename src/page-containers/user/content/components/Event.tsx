import { Button } from "@/components/ui/Button";
import { ContentData } from "@/types/Content";
import { useRouter } from "next/navigation";
import React from "react";
import ContentLayout from "./ContentLayout";
type EventProps = {
  data: ContentData;
  contentMutate: any;
};
const Event: React.FC<EventProps> = ({ data, contentMutate }) => {
  const router = useRouter();
  return (
    <ContentLayout contentMutate={contentMutate} data={data} type="Event">
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-between">
          <div>
            <Button onClick={() => router.push(`/events/${data.slug}`)}>Go to Event Detail</Button>
          </div>
          <Button>Join Now</Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Event;
