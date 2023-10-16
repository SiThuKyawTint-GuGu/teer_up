'use client';

import { Text } from '@/components/ui/Typo/Text';
import { ContentData } from '@/types/Content';
import { useEffect, useRef } from 'react';

type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  // Intersection Observer setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        // Video is in view, play it
        videoRef.current?.play();
      } else {
        // Video is not in view, pause it
        videoRef.current?.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="w-full h-full md:aspect-video relative">
      {data.content_video && (
        <video
          poster={data.content_video.thumbnail}
          preload="none"
          data-video="0"
          loop
          muted={false}
          onClick={onVideoPress}
          ref={ref => {
            videoRef.current = ref;
            setVideoRef(ref);
          }}
          className={`w-full h-full object-fill absolute`}
        >
          <source
            className={`object-cover bg-cover bg-center`}
            src={data.content_video.video_url}
            type="video/mp4"
          ></source>
        </video>
      )}

      <div className="absolute flex flex-col bottom-10 left-3 z-[1000]">
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
        <Text>{data.created_at}</Text>
      </div>
    </div>
  );
};

export default Video;
