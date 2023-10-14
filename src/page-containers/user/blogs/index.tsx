'use client';

import { Text } from '@/components/ui/Typo/Text';

import { useEffect, useRef, useState } from 'react';

const Blog = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    setVideos(dummyArray);
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
  return (
    <div className="snap-y flex-col snap-mandatory w-full h-screen  overflow-scroll">
      {dummyArray.map((v: any, index: number) => (
        <div className="h-screen w-full flex justify-center  items-center snap-start" key={index}>
          {!v.video_url ? (
            <BlogPost v={v} />
          ) : (
            <VideoPlayer v={v} setVideoRef={handleVideoRef(index)} autoplay={index === 0} />
          )}
        </div>
      ))}
    </div>
  );
};

const VideoPlayer = ({ v, setVideoRef, autoplay }: any) => {
  console.log('v', v);

  const videoRef = useRef<any>([]);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <div className="w-full h-full  md:w-[600px]  md:aspect-video relative">
      <video
        poster={v.image}
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
          src={v.video_url}
          type="video/mp4"
        ></source>
      </video>
      <div className="absolute flex flex-col bottom-10 left-3 z-[1000]">
        <Text>{v.place}</Text>
        <Text>{v.description}</Text>
        <Text>{v.hashtags}</Text>
      </div>
    </div>
  );
};
const BlogPost = ({ v }: any) => {
  return (
    <div>
      {v.description}
      {/* <Image src={v.image} width={300} height={300} alt="blog post url" /> */}
    </div>
  );
};

export default Blog;

const dummyArray: any[] = [
  {
    id: 1,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/1.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/1.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Trabalhando Muito!!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 1,
  },
  {
    id: 2,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/2.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/2.jpeg',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 3,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/3.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/3.jpeg',
    video_url: '',
    aspectRatio: 0.834,
    description: 'Rocketships fly away!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 3,
  },
  {
    id: 4,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/4.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/4.jpeg',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    aspectRatio: 0.834,
    description: '3, 2, 1, ready to launch!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 4,
  },
  {
    id: 5,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/5.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/5.jpeg',
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 6,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/6.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/6.jpeg',
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    aspectRatio: 0.834,
    description: 'Node.js + ReactJS + React Native = <3',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 3,
  },
  {
    id: 7,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/7.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/7.jpeg',
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    aspectRatio: 0.834,
    description: 'OmniStack to the rescue!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 1,
  },
  {
    id: 8,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/8.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/8.jpeg',
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    aspectRatio: 0.834,
    description: 'Rocketseat is cool!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/9.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/9.jpeg',
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    aspectRatio: 0.834,
    description: 'Have you watched our videos at YouTube?',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 4,
  },
  {
    id: 10,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/10.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/10.jpeg',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 3,
  },
  {
    id: 11,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/11.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/11.jpeg',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    aspectRatio: 0.834,
    description: 'Developing new great app!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 1,
  },
  {
    id: 12,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/12.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/12.jpeg',
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    aspectRatio: 0.834,
    description: "Let's code everyday!",
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 3,
  },
  {
    id: 13,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/4.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/4.jpeg',
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    aspectRatio: 0.834,
    description: 'Sleep, eat, code, repeat!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 14,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/5.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/5.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Working hard at Rocketseat!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 4,
  },
  {
    id: 15,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/3.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/3.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 4,
  },
  {
    id: 16,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/2.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/2.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Just studying some React Native stuff!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 3,
  },
  {
    id: 17,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/1.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/1.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'React Native is such a great tool by Facebook!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 18,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/8.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/8.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Love what you do, do what you love!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 1,
  },
  {
    id: 19,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/7.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/7.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 20,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/6.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/6.jpeg',
    video_url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    aspectRatio: 0.834,
    description: 'Are you working for your dreams?',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 1,
  },
  {
    id: 21,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/5.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/5.jpeg',
    video_url: '',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
  {
    id: 22,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/5.jpeg',
    small: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/instagram-clone/small/5.jpeg',
    video_url: '',
    aspectRatio: 0.834,
    description: 'Code, code and more code!',
    likes: 1002,
    hashtags: '#Work #Dev',
    place: 'Cinema do PrudenShopping',
    authorId: 2,
  },
];
