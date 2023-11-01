"use client";
import { useContentForm, useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";

import { Flex } from "@radix-ui/themes";

import React, { useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { DialogTrigger } from "../ui/Dialog";
import { Icons } from "../ui/Images";
import { InputText } from "../ui/Inputs";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";
type Props = {
  data: ContentData;
  mutate: any;
};

const LikeCmtBar: React.FC<Props> = ({ data, mutate }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const { trigger: postForm, isMutating } = useContentForm();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const form = useMemo(() => data.content_event?.form_config?.formdetails_configs, [data]);
  const [selectedOptions, setSelectedOptions] = useState<{ inputconfig_id: number | string; value: string }[] | []>([]);
  console.log(form, "form");
  const saveContent = async () => {
    await contentSave(
      {
        id: data.id,
      },
      {
        onSuccess: () => mutate(),
      }
    );
  };
  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => mutate(),
      }
    );
  };

  console.log("data", data);

  console.log(selectedOptions);
  const handleChange = (input: Input_options) => {
    const config = {
      inputconfig_id: input.id,
      value: input.value,
    };
    setSelectedOptions(prev => [...prev, config]);
  };

  const formSubmit = () => {
    if (data && data.content_event) {
      postForm({
        formconfig_id: data.content_event.formconfig_id,
        inputs: selectedOptions,
      });
    }
  };

  const formElements = (data: Input_config) => {
    if (data.type === "radio") {
      return data.input_options.map((input: Input_options, index: number) => (
        <div key={index} className="flex w-full flex-wrap gap-x-2">
          <input type="radio" value={input.value} onChange={() => handleChange(input)} />
          <label>{input.label}</label>
        </div>
      ));
    }
    if (data.type === "text") {
      return <InputText type={data.type} placeholder={data.placeholder} className="shadow bg-white" />;
    }
  };

  console.log("form", form);

  return (
    <div className="bg-white flex py-1 items-center">
      {data.type === "event" && (
        <Button size="sm" className="w-[166px]" onClick={() => setOpenModal(true)}>
          Join now
        </Button>
      )}
      {data.type === "opportunity" && (
        <Button size="sm" className="w-[166px]" onClick={() => setOpenModal(true)}>
          Apply now
        </Button>
      )}

      <div className="flex justify-between p-3 w-full flex-1">
        <button className="flex items-center flex-wrap gap-x-[5px]" onClick={likePost}>
          {data.is_liked ? (
            <Icons.likefill className="w-[20px] h-[20px] text-primary" />
          ) : (
            <Icons.like className="w-[20px] h-[20px]" />
          )}
          <div className="text-[14px]">{data.likes}</div>
        </button>
        <DialogTrigger>
          <div className="flex items-center flex-wrap  gap-x-[5px]">
            <Icons.comment className="w-[20px] h-[20px]" />
            <div>{data.comments}</div>
          </div>
        </DialogTrigger>

        <button className="flex items-center flex-wrap  gap-x-[5px]" onClick={saveContent}>
          {data.is_saved ? (
            <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
          ) : (
            <Icons.saved className="w-[20px] h-[20px]" />
          )}
          <div>{data.saves}</div>
        </button>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="w-[400px] p-5">
            <Text as="div" className="text-[28px] font-700">
              Join Event
            </Text>

            <div className="mx-auto flex flex-col h-full bg-layout justify-center flex-wrap gap-y-[30px] w-full">
              <Flex direction="column">
                {form &&
                  form.length > 0 &&
                  form.map((formData, formIndex) => <div key={formIndex}>{formElements(formData.input_config)}</div>)}
              </Flex>
              <Button disabled={isMutating} onClick={formSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LikeCmtBar;
