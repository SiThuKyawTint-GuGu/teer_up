"use client";
import RadioButton from "@/page-containers/user/personalized/components/RadioButton";
import { useContentForm, useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";

import { Flex, TextFieldInput } from "@radix-ui/themes";

import React, { ChangeEvent, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { DialogTrigger } from "../ui/Dialog";
import { Icons } from "../ui/Images";
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
  const form = useMemo(() => {
    if (data?.type === "event") return data.content_event?.form_config?.formdetails_configs;
    if (data?.type === "opportunity") return data.content_opportunity?.form_config?.formdetails_configs;
  }, [data]);
  const [selectedOptions, setSelectedOptions] = useState<{ inputconfig_id: number | string; value: string }[] | []>([]);
  const [message, setMessage] = useState<string>("");

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

  const handleRadio = (input: Input_options, InputConfigId: number | string) => {
    const sameId = selectedOptions.find(e => e.value === input.value);
    if (sameId) {
      setSelectedOptions(prev => prev.filter(e => e.value !== input.value));
      return;
    }
    const config = {
      inputconfig_id: InputConfigId,
      value: input.value,
    };
    setSelectedOptions(prev => [...prev, config]);
  };
  const handleInput = (InputConfigId: number | string, value: string) => {
    const config = {
      inputconfig_id: InputConfigId,
      value: value,
    };
    const sameId = selectedOptions.find(e => e.inputconfig_id === InputConfigId);
    if (sameId) {
      const valueChangeArray = selectedOptions.map(e => {
        if (e.inputconfig_id === InputConfigId) {
          e.value = value;
        }
        return e;
      });
      setSelectedOptions(valueChangeArray);
      return;
    }
    setSelectedOptions(prev => [...prev, config]);
    return;
  };

  const formSubmit = () => {
    if (data && data.content_event) {
      postForm(
        {
          content_id: data.id,
          formconfig_id: data.content_event.formconfig_id,
          inputs: selectedOptions,
        },
        {
          onSuccess: () => {
            setSelectedOptions([]);
            setMessage("Form submit Successfully");
            setTimeout(() => {
              setOpenModal(false);
              setMessage("");
            }, 3000);
          },
        }
      );
    }
    if (data && data.content_opportunity) {
      postForm(
        {
          content_id: data.id,
          formconfig_id: data.content_opportunity.formconfig_id,
          inputs: selectedOptions,
        },
        {
          onSuccess: () => {
            setSelectedOptions([]);
            setMessage("Form submit Successfully");
            setTimeout(() => {
              setOpenModal(false);
              setMessage("");
            }, 3000);
          },
        }
      );
    }
  };

  console.log("se", selectedOptions);

  const formElements = (inputData: Input_config) => {
    if (inputData.type === "radio") {
      return inputData.input_options.map((input: Input_options, index: number) => (
        <div key={index} className="flex w-full flex-wrap items-center gap-x-2">
          <RadioButton changeHandler={() => handleRadio(input, inputData.id)} />
          <label>{input.label}</label>
        </div>
      ));
    }
    if (
      inputData.type === "text" ||
      inputData.type === "date" ||
      inputData.type === "password" ||
      inputData.type === "email"
    )
      return (
        <TextFieldInput
          className={`${inputData.type !== "date" && "px-2"}`}
          type={inputData.type}
          placeholder={inputData.placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInput(inputData.id, e.target.value);
          }}
        />
      );
    if (inputData.type === "dropdown")
      return (
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleInput(inputData.id, e.target.value);
          }}
          defaultValue={inputData.input_options[0].value}
          className="bg-white w-full p-2 ring-[slateGray]"
        >
          {inputData.input_options.map((input: Input_options, index: number) => (
            <option key={index} value={input.value}>
              {input.label}
            </option>
          ))}
        </select>
      );
  };

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
          <div className="w-[400px] p-5 h-full bg-white rounded-md overflow-y-scroll">
            <Text as="div" className="text-[28px] font-700">
              {data?.content_event?.form_config.name}
            </Text>
            {message && (
              <Text as="div" className="text-center w-full text-green-600 font-[600] text-sm">
                {message}
              </Text>
            )}
            <div className="mx-auto flex flex-col  bg-layout justify-center flex-wrap gap-y-5 w-full">
              <Flex direction="column" justify="center">
                {form &&
                  form.length > 0 &&
                  form.map((formData: any, formIndex) => (
                    <div key={formIndex} className="my-1 px-2">
                      {formElements(formData.input_config)}
                    </div>
                  ))}
              </Flex>
            </div>
            <Button loading={isMutating} disabled={isMutating} className="w-full" onClick={formSubmit}>
              Submit
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LikeCmtBar;
