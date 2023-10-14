'use client';

import { Text } from '@/components/ui/Typo/Text';
import { ParamsType, useGetContent } from '@/services/user';
import { ContentData, ContentType } from '@/types/Content';

import { useEffect, useRef, useState } from 'react';

const Blog = () => {
  const { data: contentData } = useGetContent<ParamsType, ContentType>({
    page: 1,
    pageSize: 20,
  });

  const [videos, setVideos] = useState<any>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    setVideos(contentData);
  }, []);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries: any[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach(videoRef => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);
  const handleVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };

  const differentContent = (data: ContentData, index: number) => {
    if (data.type === 'video' && data.content_video)
      return <VideoPlayer data={data} setVideoRef={handleVideoRef(index)} autoplay={index === 0} />;
    if (data.type === 'event' && data.content_event) return <div>event</div>;
    if (data.type === 'article' && data.content_article) return <div>article</div>;
  };
  return (
    <div className="snap-y flex-col snap-mandatory w-full h-screen  overflow-scroll">
      {contentData?.data.map((data: ContentData, index: number) => (
        <div className="h-screen w-full flex justify-center  items-center snap-start" key={index}>
          {differentContent(data, index)}
          {/* {!data.video_url ? (
            <BlogPost v={data} />
          ) : (
            <VideoPlayer v={data} setVideoRef={handleVideoRef(index)} autoplay={index === 0} />
          )} */}
        </div>
      ))}
    </div>
  );
};
type VideoPlayerProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ data, setVideoRef, autoplay }) => {
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
    <div className="w-full h-full md:w-[600px] md:aspect-video relative">
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

export default Blog;
