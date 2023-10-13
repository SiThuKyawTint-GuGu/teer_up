'use client';
import React, { useRef, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import * as Switch from '@radix-ui/react-switch';
import { Editor } from '@tinymce/tinymce-react';

import '@/styles/tab.css';
import '@/styles/switch.css';

interface Props {
  params: { id: number };
}
const PostDetail = ({ params: { id } }: Props) => {
  const editorRef = useRef<any>();
  // console.log(id);
  const [selectedValue, setSelectedValue] = useState<String>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const handleSelectChange = (selectedValue: String) => {
    // Handle the selected value
    console.log('Selected value:', selectedValue);
    setSelectedValue(selectedValue);
  };

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  return (
    <>
      <div className="bg-white p-10 rounded-md">
        <div className="mb-5">
          <p className="font-weight-600 mb-3">Name</p>
          <fieldset className="Fieldset mb-10">
            <input className="Input" id="name" defaultValue="Name" />
          </fieldset>
        </div>
        <div className="mb-5">
          <p className="font-weight-600 mb-3">Link</p>
          <fieldset className="Fieldset mb-10">
            <input className="Input" id="link" defaultValue="Link" />
          </fieldset>
        </div>
        <div className="mb-10">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
              Category
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="value1">Option 1</SelectItem>
              <SelectItem value="value2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-10 mt-5">
          <form>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Switch.Root
                className="SwitchRoot mr-3"
                id="airplane-mode"
                checked={isSwitchOn}
                onCheckedChange={handleSwitchToggle}
              >
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
              <label className="Label" htmlFor="airplane-mode">
                Visible to Public
              </label>
            </div>
          </form>
        </div>

        <div className="mb-10">
          <p className="font-weight-600 mb-3">Content</p>
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green cursor-pointer">Submit</button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
