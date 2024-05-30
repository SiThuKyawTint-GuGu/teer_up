/* eslint-disable no-unused-vars */
"use client";
import { useContentForm, useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";
import { getToken } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Section } from "@radix-ui/themes";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { Animate, Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Icons } from "../ui/Images";
import { InputText } from "../ui/Inputs";
import { Autocomplete, Item } from "../ui/Inputs/Autocomplete";
import { Checkbox } from "../ui/Inputs/Checkbox";
import { Radio, RadioItem } from "../ui/Inputs/Radio";
import { Label } from "../ui/Label";
import { Text } from "../ui/Typo/Text";
import CommentSection from "./CommentSection";
import SuccessFormPage from "./SuccessFormPage";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

enum dialogTrigger {
  COMMENT = "comment",
  FORM = "form",
}

type Props = {
  data: ContentData;
  mutate: any;
  comments: number;
  setComments: any;
};

const LikeCmtBar: React.FC<Props> = ({ data, mutate, comments, setComments }) => {
  const { trigger: like } = useLikeContent();
  const setOpportunityData = useStore(state => state.setOpportunityData);
  const router = useRouter();
  const { trigger: contentSave } = useSaveContent();
  const { trigger: postForm, isMutating } = useContentForm();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<dialogTrigger>();
  const form = useMemo(() => {
    if (data?.type === "event") return data.content_event?.form_config;
    if (data?.type === "opportunity") return data.content_opportunity?.form_config;
    if (data?.type === "article") return data.content_article?.form_config;
  }, [data]);
  const [selectedOptions, setSelectedOptions] = useState<
    { inputconfig_id: number | string; value: string | Date }[] | []
  >([]);
  const [message, setMessage] = useState<string>("");
  const [showSuccessPage, setShowSuccessPage] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const token = getToken();
  const [reaction, setReacion] = useState({
    likes: 0,
    is_like: false,
    saves: 0,
    is_save: false,
  });
  const AllOppoData = {
    data: data,
    mutate: mutate,
    comments: comments,
    setComments: setComments,
  };

  useEffect(() => {
    setReacion(prev => ({
      ...prev,
      ["saves"]: data.saves,
      ["is_save"]: data.is_saved,
      ["likes"]: data.likes,
      ["is_like"]: data.is_liked,
    }));
  }, [data]);

   const handleNext = (_: undefined) => {
     setOpportunityData({ someData: AllOppoData });
     router.push("/opportunity");
   };


  // <Link href={{pathname:`/profile/${id}/education/${each.id}`,query: { from: referrer }}}></Link>
  // setOpenModal(true);


  const likePost = async () => {
    if (reaction.is_like && token) {
      setReacion(prev => ({ ...prev, ["likes"]: prev.likes - 1, ["is_like"]: false }));
    }
    if (!reaction.is_like && token) {
      setReacion(prev => ({ ...prev, ["likes"]: prev.likes + 1, ["is_like"]: true }));
    }
    await like({ id: data.id });
  };

  const saveContent = async () => {
    if (reaction.is_save && token) {
      setReacion(prev => ({ ...prev, ["saves"]: prev.saves - 1, ["is_save"]: false }));
    }
    if (!reaction.is_save && token) {
      setReacion(prev => ({ ...prev, ["saves"]: prev.saves + 1, ["is_save"]: true }));
    }
    await contentSave({
      id: data.id,
    });
  };

  const handleCheckBox = (input: Input_options, InputConfigId: number | string) => {
    const sameId = selectedOptions.find(e => e.value === input.value);
    console.log(sameId);

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
  // const handleRadio = (value: string, InputConfigId: number | string) => {
  //   const sameId = selectedOptions.find(e => e.value === input.value);
  //   if (sameId) {
  //     setSelectedOptions(prev => prev.filter(e => e.inputconfig_id !== InputConfigId));
  //     return;
  //   }
  //   const config = {
  //     inputconfig_id: InputConfigId,
  //     value: input.value,
  //   };
  //   setSelectedOptions(prev => [...prev, config]);
  // };

  const handleInput = (InputConfigId: number | string, value: string | Date) => {
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
    if (data && data.content_article) {
      postForm(
        {
          content_id: data.id,
          formconfig_id: data.content_article.formconfig_id,
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
  };

  const formElements = (inputData: Input_config) => {
    if (inputData.type === "radio") {
      return (
        <>
          <Box className="pb-[7px]">
            <Section py="1" px="3">
              <Text as="label" className="block mb-3 text-md font-medium text-gray-700">
                {inputData.name}
              </Text>
              {/* {inputData.input_options.map((input: Input_options, index: number) => (
                <div key={index} className="flex w-full flex-wrap items-center gap-x-2">
                  <RadioButton changeHandler={() => handleRadio(input, inputData.id)} />
                
                  <label>{input.label}</label>
                </div>
              ))} */}
              <Radio className="space-y-[10px] mb-2" onValueChange={val => handleInput(inputData.id, val)}>
                {inputData.input_options?.map((input: Input_options, key) => (
                  <Label key={key}>
                    <Flex
                      className="capitalize mb-2  w-full"
                      justify="end"
                      gap="3"
                      direction="row-reverse"
                      align="center"
                    >
                      <Text className="px-2">{input.label}</Text>
                      <RadioItem value={input.value} />
                    </Flex>
                  </Label>
                ))}
              </Radio>
            </Section>
          </Box>
        </>
      );
    }
    // if (inputData.type === "date") {
    //   return (
    //     <Box className="pb-[7px]">
    //       <Section className="" py="1" px="3">
    //         <Text as="label">{inputData.name}</Text>
    //         {/* <CardBox className="px-[12px] py-[8px] "> */}
    //         {/* <label className="flex justify-between items-center">
    //             <ReactDatePicker
    //               onChange={(date: Date | null) => {
    //                 if (date) {
    //                   handleInput(inputData.id, dayjs(date).format("DD/MM/YY"));
    //                   setDateValue(date);
    //                 }
    //               }}
    //               dateFormat="dd/MM/yy"
    //               selected={dateValue}
    //               className="w-full bg-white"
    //               shouldCloseOnSelect
    //             />
    //             <Icons.calender />
    //           </label> */}
    //         {/* <input
    //           type="date"
    //           className={cn("font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none")}
    //           onChange={}
    //         /> */}
    //         {/* </CardBox> */}
    //       </Section>
    //     </Box>
    //   );
    // }
    if (
      inputData.type === "text" ||
      // inputData.type === "phone" ||
      inputData.type === "password" ||
      inputData.type === "email" ||
      inputData.type === "date"
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
          <Text as="label">{inputData.name}</Text>
          <Section className="bg-white" py="1" px="3">
            <InputText
              type={inputData.type === "date" ? "date" : "text"}
              className="p-2"
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
          {/* <Section className="bg-white w-full" py="1" px="3">
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
                {inputData.input_options.map((dropdown: Input_options, index: number) => (
                  <SelectItem key={index} value={dropdown.value}>
                    <Text>{dropdown.label}</Text>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Section> */}
          <Text as="label">{inputData.name}</Text>
          <Autocomplete
            className={cn("bg-white shadow-md w-full")}
            onChange={() => {}}
            placeholder={inputData.placeholder}
          >
            {inputData.input_options.map((dropdown: Input_options, index: number) => (
              <Item
                key={index}
                value={dropdown.label}
                onClick={() => {
                  console.log(dropdown);
                  handleInput(inputData.id, dropdown.value);
                }}
              >
                {dropdown.label}
              </Item>
            ))}
          </Autocomplete>
        </Box>
      );
    if (inputData.type === "checkbox") {
      return (
        <Box className="pb-[7px]">
          <Section py="1" px="3">
            <Text as="label" className="block text-md font-medium text-gray-700">
              {inputData.placeholder}
            </Text>
            {inputData.input_options.map((input: Input_options, index: number) => (
              <div key={index} className="flex w-full flex-wrap my-2 items-center gap-x-2">
                <Checkbox
                  defaultChecked={false}
                  onCheckedChange={() => handleCheckBox(input, inputData.id)}
                  value={input.value}
                />
                <Text>{input.label}</Text>
              </div>
            ))}
          </Section>
        </Box>
      );
    }
  };

  // onClick={() => setTriggerType(dialogTrigger.FORM)}
  
  return (
    <Dialog>
      {showSuccessPage === false ? (
        <div className="bg-white flex px-3 items-center py-2">
          {form ? (
            <>
              <DialogTrigger asChild >
                <Button size="sm" className="w-[166px]" onClick={() => handleNext(undefined)}>
                  {form?.submit_label || "Join Now"}
                </Button>
              </DialogTrigger>
              {triggerType === dialogTrigger.FORM && (
                <DialogClose asChild>
                  <DialogContent
                    animate={Animate.SLIDE}
                    className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}
                  >
                    <Box className="bg-white px-4 space-y-4 max-h-[600px] rounded-md overflow-y-scroll">
                      <div className="fixed top-0 left-0 w-full h-5 flex items-center bg-white z-10">
                        <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
                      </div>
                      <Text as="div" className="text-[28px] font-700">
                        {form?.name}
                      </Text>
                      {message && (
                        <Text as="div" className="text-center w-full text-green-600 font-[600] text-sm">
                          {message}
                        </Text>
                      )}
                      <div className="mx-auto flex flex-col   bg-white justify-center flex-wrap gap-y-5 w-full">
                        <Flex direction="column" justify="center" className="w-full h-full">
                          {form &&
                            form.formdetails_configs.map((formData: any, formIndex) => (
                              <div key={formIndex} className="my-1 px-2">
                                {formElements(formData.input_config)}
                              </div>
                            ))}
                          <div className="w-full min-h-full pt-2 px-2">
                            <Flex>
                              <Checkbox className="me-3" onCheckedChange={(val: boolean) => setChecked(val)} />
                              <Flex direction="column">
                                <Text>
                                  By submitting this form, I confirm that I have read, understood and given my consent
                                  for Prudential Assurance Company Singapore and its related corporations, respective
                                  representatives, agents, third party service providers, contractors and/or appointed
                                  distribution/business partners (collectively referred to as “Prudential”), and Small
                                  and Medium-sized Enterprises (“SME”) to collect, use, disclose and/or process my/our
                                  personal data for the purpose(s) of:
                                </Text>
                                <ul>
                                  <li>
                                    <Text>1) Registration for TEE Up Programme application.</Text>
                                  </li>
                                  <li>
                                    <Text>2) Events and Courses sign ups.</Text>
                                  </li>
                                  <li>
                                    <Text>3) Internship or Job applications.</Text>
                                  </li>
                                  <li>
                                    <Text>4) Educational and promotional purposes.</Text>
                                  </li>
                                  <li>
                                    <Text>
                                      I understand that I can refer to Prudential Data Privacy, which is available at{" "}
                                      <Link
                                        className="text-primary"
                                        target="_blank"
                                        href="http://www.prudential.com.sg/Privacy-Notice"
                                      >
                                        http://www.prudential.com.sg/Privacy-Notice
                                      </Link>{" "}
                                      for more information.
                                    </Text>
                                    <Text>
                                      I may contact{" "}
                                      <Link
                                        className="text-primary"
                                        target="_blank"
                                        href="mailto:innovation@prudential.com.sg"
                                      >
                                        innovation@prudential.com.sg
                                      </Link>{" "}
                                      on how I may access and correct my personal data or withdraw consent to the
                                      collection, use or disclosure of my personal data.
                                    </Text>
                                  </li>
                                </ul>
                                <Flex gap="3" align="center" my="2" width="100%">
                                  <Text>I have read, agreed and consent</Text>
                                </Flex>
                              </Flex>
                            </Flex>
                          </div>
                        </Flex>
                      </div>
                      <Section py="1" className="mt-3" px="3">
                        <Button
                          loading={isMutating}
                          disabled={isMutating || !checked}
                          className="w-full"
                          onClick={formSubmit}
                        >
                          Submit
                        </Button>
                      </Section>
                    </Box>
                  </DialogContent>
                </DialogClose>
              )}
            </>
          ) : (
            <DialogTrigger asChild onClick={() => setTriggerType(dialogTrigger.COMMENT)}>
              <Section className="bg-white" py="1" px="3">
                <div className="w-full h-[32px]">
                  <input
                    className="w-full h-full px-[12px] py-[4px] rounded-[40px] bg-[#F8F9FB] dark:bg-[#F8F9FB] outline-none placeholder:text-[16px] placeholder:font-[300]"
                    placeholder="Write your comment"
                  ></input>
                </div>
              </Section>
            </DialogTrigger>
          )}

          <div className="flex justify-between px-3 w-full flex-1">
            <div className="flex items-center cursor-pointer flex-wrap gap-x-[5px]" onClick={likePost}>
              {reaction.is_like ? (
                <Icons.likeFill className="w-[20px] h-[20px] text-primary" />
              ) : (
                <Icons.like className="w-[20px] h-[20px]" />
              )}
              <div className="text-[14px]">{reaction.likes}</div>
            </div>

            <DialogTrigger onClick={() => setTriggerType(dialogTrigger.COMMENT)}>
              <div className="flex items-center flex-wrap gap-x-[10px]">
                <Icons.comment className="w-[20px] h-[20px]" />
                <div>
                  {""}
                  {comments}
                </div>
              </div>
            </DialogTrigger>
            {triggerType === dialogTrigger.COMMENT && (
              <DialogContent
                animate={Animate.SLIDE}
                className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}
              >
                <CommentSection data={data} mutateParentData={mutate} setComments={setComments} />
              </DialogContent>
            )}

            <button className="flex items-center flex-wrap  gap-x-[5px]" onClick={saveContent}>
              {reaction.is_save ? (
                <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
              ) : (
                <Icons.saved className="w-[20px] h-[20px]" />
              )}
              <div>{reaction.saves}</div>
            </button>
          </div>
        </div>
      ) : (
        <SuccessFormPage />
      )}
    </Dialog>
  );
};

export default LikeCmtBar;
