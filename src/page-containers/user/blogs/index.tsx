import { promises as fs } from 'fs';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
const Blog = async () => {
  const file = await fs.readFile(process.cwd() + '/json/data.json', 'utf8');
  const data = JSON.parse(file);
  const fullData = data.feed;
  console.log(fullData);
  return (
    <div>
      {fullData?.map((data: any, index: number) => (
        <section key={index} id={data.video_url} className="mb-5 w-[50%] mx-auto h-screen">
          <MediaPlayer
            src={data.video_url}
            aspectRatio={data.aspectRatio}
            className="w-full aspect-video"
            autoplay={true}
            poster={data.image}
            preload="auto"
            title={data.title}
          >
            <MediaProvider />
          </MediaPlayer>
        </section>
      ))}
    </div>
  );
};

export default Blog;
