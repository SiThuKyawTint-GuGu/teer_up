'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import { getToken } from '@/utils/auth';

import { postMethod } from '@/hooks/postMethod';
import { ContentArgType, ParamsType, useGetContentById, usePostContent } from '@/services/content';
import '@/styles/switch.css';
import '@/styles/tab.css';
import { ContentResponseData } from '@/types/Content';

interface Props {
  id: string;
}
const ContentDetail = ({ id }: Props) => {
  const authToken = getToken();
  const [selectedValue, setSelectedValue] = useState<String>('');
  const [error, setError] = useState<string>('');
  const [content, setContent] = useState<ContentResponseData | null>(null);

  const [videoUrl, setVideoUrl] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFile(file);
      setVideoUrl(fileURL);
    }
  };

  const params: ParamsType = {
    id,
  };

  const { data } = useGetContentById<ParamsType, any>(params);
  console.log('data from content detail id', data);

  // const getContentById = async () => {
  //   getMethod<any>(`/content/${id}`, authToken)
  //     .then(response => {
  //       console.log(response);
  //       setContent(response.data);
  //       setTitle(response.data.title);
  //       setDesc(response.data.description);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setError(error.message);
  //     });
  // };

  // useEffect(() => {
  //   if (id != 0) {
  //     getContentById();
  //   }
  // }, []);

  const handleSubmit = () => {
    // if (thumbnail) {
    //   const formData = new FormData();
    //   formData.append('file', thumbnail);
    //   postMethod<any>('/content/fileupload', formData, authToken)
    //     .then(response => {
    //       console.log('file upload from ', response);
    //     })
    //     .catch(error => console.log(error));
    // }
    const data: ContentArgType = {
      title,
      description: desc,
      image_url: '',
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = usePostContent(data);
    console.log('response from post', response);
    // postMethod<any>("/content", data, authToken)
    //   .then(response => {
    //     console.log("create data", response);
    //   })
    //   .catch(error => console.log(error));
  };

  const handleUpdate = () => {
    const data = {
      title,
      description: desc,
      video_url: null,
      photo_url: null,
    };
    postMethod<any>(`/content/${id}`, data, authToken)
      .then(response => {
        console.log('updated data', response);
      })
      .catch(error => console.log(error));
  };

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    }
  };

  const handleSelectChange = (selectedValue: String) => {
    // Handle the selected value
    console.log('Selected value:', selectedValue);
    setSelectedValue(selectedValue);
  };

  return (
    <>
      <div className="bg-white p-10 rounded-md">
        <div className="mb-5">
          <p className="font-weight-600 mb-3">Title</p>
          <fieldset className="Fieldset mb-10">
            <input
              className="Input"
              id="title"
              onChange={e => setTitle(e.target.value)}
              defaultValue={content?.title || ''}
            />
          </fieldset>
        </div>
        <div className="mb-5">
          <p className="font-weight-600 mb-3">Description</p>
          <fieldset className="Fieldset mb-10">
            <input
              className="Input"
              id="description"
              onChange={e => setDesc(e.target.value)}
              defaultValue={content?.description || ''}
            />
          </fieldset>
        </div>
        <div className="mb-10">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
              {selectedValue ? selectedValue : 'Category'}
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
              <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-400 text-white rounded-lg cursor-pointer">
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
              <label className="flex items-center w-[30%] justify-center px-4 py-2 bg-red-400 text-white rounded-lg cursor-pointer">
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
        {content && content?.video_url && (
          <div className="mt-4">
            <p className="font-bold mb-2">Video Preview:</p>
            <video width={300} height={300} controls>
              <source src={content.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {content && content?.photo_url && (
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
        )}
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          {id != 0 ? (
            <button onClick={handleUpdate} className="Button green cursor-pointer">
              Update
            </button>
          ) : (
            <button onClick={handleSubmit} className="Button green cursor-pointer">
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentDetail;
