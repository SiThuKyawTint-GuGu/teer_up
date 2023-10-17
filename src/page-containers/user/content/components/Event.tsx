import { ContentData } from '@/types/Content';
import { useRouter } from 'next/navigation';
import React from 'react';
type EventProps = {
  data: ContentData;
};
const Event: React.FC<EventProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push(`/events/${data.slug}`)}>
        Go To Event Page- {data.title}
      </button>
    </div>
  );
};

export default Event;
