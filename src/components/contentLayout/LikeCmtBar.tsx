"use client";
import RadioButton from "@/page-containers/user/personalized/components/RadioButton";
import { useContentForm, useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";

import { Box, Flex, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import React, { ChangeEvent, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Button } from "../ui/Button";
import CardBox from "../ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Icons } from "../ui/Images";
import { InputText } from "../ui/Inputs";
import { Checkbox } from "../ui/Inputs/Checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/Inputs/Select";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";
import CommentSection from "./CommentSection";
import SuccessFormPage from "./SuccessFormPage";

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
    if (data?.type === "event") return data.content_event?.form_config;
    if (data?.type === "opportunity") return data.content_opportunity?.form_config;
    if (data?.type === "article") return data.content_article?.form_config;
  }, [data]);
  const [selectedOptions, setSelectedOptions] = useState<{ inputconfig_id: number | string; value: string }[] | []>([]);
  const [message, setMessage] = useState<string>("");
  const [showSuccessPage, setShowSuccessPage] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string>(dayjs(new Date()).toString());
  const [openComment, setOpenComment] = useState<boolean>(false);

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
            setShowSuccessPage(true);
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

  const formElements = (inputData: Input_config) => {
    if (inputData.type === "radio") {
      return (
        <>
          <Box className="pb-[7px]">
            <Section py="1" px="3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {inputData.placeholder}
              </label>
              {inputData.input_options.map((input: Input_options, index: number) => (
                <div key={index} className="flex w-full flex-wrap items-center gap-x-2">
                  <RadioButton changeHandler={() => handleRadio(input, inputData.id)} />
                  <label>{input.label}</label>
                </div>
              ))}
            </Section>
          </Box>
        </>
      );
    }
    if (inputData.type === "date") {
      return (
        <Box className="pb-[7px]">
          <Section className="bg-white" py="1" px="3">
            <CardBox className="px-[12px] py-[8px] flex justify-between items-center">
              <ReactDatePicker
                onChange={(date: Date | null) => {
                  if (date) {
                    handleInput(inputData.id, dayjs(date).format());
                    const dateParentObject = selectedOptions.find((e: any) => e.id === inputData.id);
                    if (dateParentObject) {
                      setDateValue(dateParentObject.value);
                    }

                    // Adjust the date format as needed
                  }
                }}
                value={dateValue}
                dateFormat="dd/MM/yyyy"
                className="w-full bg-white"
              />
              <Icons.calender />
            </CardBox>
          </Section>
        </Box>
      );
    }
    if (
      inputData.type === "text" ||
      // inputData.type === "phone" ||
      inputData.type === "password" ||
      inputData.type === "email"
    )
      return (
        // <TextFieldInput
        //   className={`${inputData.type !== "date" && "px-2"}`}
        //   type={inputData.type}
        //   placeholder={inputData.placeholder}
        //   onChange={(e: ChangeEvent<HTMLInputElement>) => {
        //     handleInput(inputData.id, e.target.value);
        //   }}
        // />
        <Box className="pb-[7px]">
          <Section className="bg-white" py="1" px="3">
            <InputText
              type="text"
              inputType={inputData.type}
              placeholder={inputData.placeholder}
              handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInput(inputData.id, e.target.value);
              }}
            />
          </Section>
        </Box>
      );
    if (inputData.type === "dropdown")
      return (
        // <select
        // onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        //   handleInput(inputData.id, e.target.value);
        // }}
        //   defaultValue={inputData.input_options[0].value}
        //   className="bg-white w-full p-2 ring-[slateGray]"
        // >
        //   {inputData.input_options.map((input: Input_options, index: number) => (
        //     <option key={index} value={input.value}>
        //       {input.label}
        //     </option>
        //   ))}
        // </select>
        <Box className="pb-[7px]">
          <Section className="bg-white w-full" py="1" px="3">
            <Select
              onValueChange={(value: string) => {
                handleInput(inputData.id, value);
              }}
              defaultValue={inputData.input_options[0].value}
            >
              <SelectTrigger className="border-none outline-none bg-white border-gray-700 shadow-theme">
                {inputData.placeholder}
              </SelectTrigger>
              <SelectContent className="bg-white">
                {inputData.input_options.map((dropdown: any, index: number) => (
                  <SelectItem key={index} value={dropdown.value}>
                    {dropdown.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Section>
        </Box>
      );
    if (inputData.type === "checkbox") {
      return (
        <Box className="pb-[7px]">
          <Section py="1" px="3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {inputData.placeholder}
            </label>
            {inputData.input_options.map((input: Input_options, index: number) => (
              <div key={index} className="flex w-full flex-wrap my-2 items-center gap-x-2">
                <Checkbox
                  defaultChecked={false}
                  // onCheckedChange={(checked: boolean) => handleCheckedChange(checked, each?.id)}
                />
                <label>{input.label}</label>
              </div>
            ))}
          </Section>
        </Box>
      );
    }
  };

  return (
    <>
      {showSuccessPage === false ? (
        <div className="bg-white flex py-2 px-3 items-center">
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
          {data.type === "article" && (
            <Button size="sm" className="w-[166px]" onClick={() => setOpenModal(true)}>
              Suggest Now
            </Button>
          )}

          <div className="flex justify-between px-3 w-full flex-1">
            <button className="flex items-center flex-wrap gap-x-[5px]" onClick={likePost}>
              {data.is_liked ? (
                <Icons.likefill className="w-[20px] h-[20px] text-primary" />
              ) : (
                <Icons.like className="w-[20px] h-[20px]" />
              )}
              <div className="text-[14px]">{data.likes}</div>
            </button>

            <Dialog open={openComment} onOpenChange={val => setOpenComment(val)}>
              <DialogTrigger>
                <div className="flex items-center flex-wrap gap-x-[10px]">
                  <Icons.comment className="w-[20px] h-[20px]" />
                  <div>
                    {""}
                    {data.comments}
                  </div>
                </div>
              </DialogTrigger>
              {openComment && (
                <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
                  <CommentSection data={data} mutateParentData={mutate} />
                </DialogContent>
              )}
            </Dialog>

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
                  {form?.name}
                </Text>
                {message && (
                  <Text as="div" className="text-center w-full text-green-600 font-[600] text-sm">
                    {message}
                  </Text>
                )}
                <div className="mx-auto flex flex-col  bg-white justify-center flex-wrap gap-y-5 w-full">
                  <Flex direction="column" justify="center">
                    {form &&
                      form.formdetails_configs.map((formData: any, formIndex) => (
                        <div key={formIndex} className="my-1 px-2">
                          {formElements(formData.input_config)}
                        </div>
                      ))}
                  </Flex>
                </div>
                <Section py="1" px="3">
                  <Button loading={isMutating} disabled={isMutating} className="w-full" onClick={formSubmit}>
                    Submit
                  </Button>
                </Section>
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <SuccessFormPage />
      )}
    </>
  );
};

export default LikeCmtBar;
