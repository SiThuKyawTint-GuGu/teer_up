'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import { getToken } from '@/utils/auth';

import '@/styles/tab.css';
import '@/styles/switch.css';

interface Props {
  params: { id: number };
}
const PostDetail = ({ params: { id } }: Props) => {
  const authToken = getToken();
  const [selectedValue, setSelectedValue] = useState<String>('');

  const [videoUrl, setVideoUrl] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFile(file);
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   //   console.log('file url', fileURL);
      //   setVideoUrl(fileURL);
      //   postMethod<any>('/content/fileupload', formData, authToken)
      //     .then(response => {
      //       console.log('file upload', response);
      //     })
      //     .catch(error => console.log(error));
    }
  };

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
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
            <input className="Input" id="title" defaultValue="" />
          </fieldset>
        </div>
        <div className="mb-5">
          <p className="font-weight-600 mb-3">Description</p>
          <fieldset className="Fieldset mb-10">
            <input className="Input" id="description" defaultValue="" />
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
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green cursor-pointer">Submit</button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
