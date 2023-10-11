'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';

import mainLogo from '@/configs/img/auth/mainLogo.png';
import * as Tabs from '@radix-ui/react-tabs';
import { Button } from '@radix-ui/themes';
import { Editor } from '@tinymce/tinymce-react';

import '@/styles/tab.css';

const ProjectDetail = () => {
  const editorRef = useRef();

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          Project Details
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger " value="tab2">
          Project Review
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab3">
          Project Teams & Earned
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab4">
          New Applyer
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab5">
          Stages
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <p className="font-weight-600 mb-3">Project Image</p>
        <Image src={mainLogo} height={400} width={400} alt="prjImg" className="rounded-md mb-10" />

        <p className="font-weight-600 mb-3">Project Name</p>
        <fieldset className="Fieldset mb-10">
          <input className="Input" id="name" defaultValue="Project Name" />
        </fieldset>

        <p className="font-weight-600 mb-3">Project Description</p>
        <div className="mb-10">
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div>

        <p className="font-weight-600 mb-3">Point Required</p>
        <fieldset className="Fieldset">
          <input className="Input" id="point" defaultValue="1,000" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <Button
            variant="outline"
            className=" outlineButton flex justify-center items-center rounded-md"
          >
            <AiOutlinePlus />
            Add Document
          </Button>
        </div>
      </Tabs.Content>

      <Tabs.Content className="TabsContent" value="tab2">
        {/* <p className="Text">Change your password here. After saving, you'll be logged out.</p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="currentPassword">
              Current password
            </label>
            <input className="Input" id="currentPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="newPassword">
              New password
            </label>
            <input className="Input" id="newPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input className="Input" id="confirmPassword" type="password" />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
            <button className="Button green">Change password</button>
          </div> */}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProjectDetail;
