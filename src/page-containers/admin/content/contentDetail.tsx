'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import { getToken, getUserInfo } from '@/utils/auth';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { InputText } from '@/components/ui/Inputs';
import { postMethod } from '@/hooks/postMethod';
import { useGetContentById, usePostContent, usePostFile } from '@/services/content';
import '@/styles/switch.css';
import '@/styles/tab.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface Props {
  id: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required!'),
  description: yup.string().required('Description is required!'),
});

const ContentDetail = ({ id }: Props) => {
  const authToken = getToken();
  const userInfo = getUserInfo();
  const { data: content } = useGetContentById<any>(id);

  const { trigger: fileTrigger } = usePostFile();
  const { trigger: postTrigger } = usePostContent();

  const [selectedValue, setSelectedValue] = useState<string>('');
  // const [content, setContent] = useState<ContentResponseData | null>(null);

  const [videoUrl, setVideoUrl] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const form = useForm<{ title: string; description: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: content?.data?.title || undefined,
      description: content?.data?.description || undefined,
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFile(file);
      setVideoUrl(fileURL);
    }
  };

  const handleSubmit = async (data: { title: string; description: string }) => {
    let thumbnailUrl = '';
    let videoUrl = '';

    // Await both API calls simultaneously
    const thumbnailRes: any = thumbnail && (await fileTrigger({ file: thumbnail }));
    const videoRes: any = file && (await fileTrigger({ file }));

    if (thumbnailRes) {
      thumbnailUrl = thumbnailRes.data?.data?.file_path;
      console.log('Thumbnail URL:', thumbnailUrl);
    }

    if (videoRes) {
      videoUrl = videoRes.data?.data?.file_path;
      console.log('Video URL:', videoUrl);
    }

    const postdata = {
      title: data?.title,
      description: data?.description,
      type: selectedValue,
      user_id: userInfo.id,
      content_video: {
        video_url: videoUrl,
        thumbnail: thumbnailUrl,
      },
    };

    await postTrigger(postdata);
  };

  const handleUpdate = () => {
    // const data = {
    //   title,
    //   description: desc,
    //   video_url: null,
    //   photo_url: null,
    // };
    // postMethod<any>(`/content/${id}`, data, authToken)
    //   .then(response => {
    //     console.log('updated data', response);
    //   })
    //   .catch(error => console.log(error));
  };

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    setSelectedValue(selectedValue);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="bg-white p-10 rounded-md">
            <div className="mb-5">
              {/* <p className="font-weight-600 mb-3">Title</p>
              <fieldset className="Fieldset mb-10">
                <input
                  className="Input"
                  id="title"
                  onChange={e => setTitle(e.target.value)}
                  // defaultValue={content?.title || ''}
                />
              </fieldset> */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <InputText placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <InputText placeholder="Description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-10">
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                  {content?.type ? content.type : selectedValue ? selectedValue : 'Type'}
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="video">video</SelectItem>
                  <SelectItem value="photo">photo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedValue === 'video' && (
              <>
                <div className="p-8">
                  <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                    <span className="text-base font-medium">Upload Video</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                      multiple={false}
                    />
                  </label>

                  {videoUrl && (
                    <div className="mt-4">
                      <p className="font-bold mb-2">Video Preview:</p>
                      <video className="w-full" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                    <span className="text-base font-medium">Upload Thumbnail</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>

                  {fileUrl && (
                    <div className="mt-4">
                      <p className="font-bold mb-2">Thumbnail Preview:</p>
                      <Image
                        width={300}
                        height={300}
                        src={fileUrl}
                        alt="File Preview"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {/* {content && content?.video_url && (
          <div className="mt-4">
            <p className="font-bold mb-2">Video Preview:</p>
            <video width={300} height={300} controls>
              <source src={content.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )} */}
            {/* {content && content?.photo_url && (
          <div className="mt-4">
            <p className="font-bold mb-2">Thumbnail Preview:</p>
            <Image
              width={300}
              height={300}
              src={content.photo_url}
              alt="File Preview"
              className="max-w-full h-auto"
            />
          </div>
        )} */}
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
              <Button className="p-2 mt-[20px] rounded-md w-[15%] text-white" type="submit">
                {id != '0' ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContentDetail;
