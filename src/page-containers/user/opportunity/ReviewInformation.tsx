/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";
import { getToken } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Animate, Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { InputText } from "@/components/ui/Inputs";
import { Autocomplete, Item } from "@/components/ui/Inputs/Autocomplete";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Radio, RadioItem } from "@/components/ui/Inputs/Radio";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

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

const ReviewInformation: React.FC<Props> = ({ data, mutate, comments, setComments }) => {
  const { trigger: like } = useLikeContent();
  const setOpportunityData = useStore(state => state.setOpportunityData);
  const router = useRouter();
  const { trigger: contentSave } = useSaveContent();
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

  const handleNext = (_: undefined) => {
    setOpportunityData({ someData: AllOppoData });
    router.push("/opportunity");
  };

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

  // const formSubmit = () => {
  //   if (data && data.content_event) {
  //     postForm(
  //       {
  //         content_id: data.id,
  //         formconfig_id: data.content_event.formconfig_id,
  //         inputs: selectedOptions,
  //       },
  //       {
  //         onSuccess: () => {
  //           setSelectedOptions([]);
  //           setMessage("Form submit Successfully");
  //           setShowSuccessPage(true);
  //           setTimeout(() => {
  //             setOpenModal(false);
  //             setMessage("");
  //           }, 3000);
  //         },
  //       }
  //     );
  //   }
  //   if (data && data.content_opportunity) {
  //     postForm(
  //       {
  //         content_id: data.id,
  //         formconfig_id: data.content_opportunity.formconfig_id,
  //         inputs: selectedOptions,
  //       },
  //       {
  //         onSuccess: () => {
  //           setSelectedOptions([]);
  //           setMessage("Form submit Successfully");
  //           setTimeout(() => {
  //             setOpenModal(false);
  //             setMessage("");
  //           }, 3000);
  //         },
  //       }
  //     );
  //   }
  //   if (data && data.content_article) {
  //     postForm(
  //       {
  //         content_id: data.id,
  //         formconfig_id: data.content_article.formconfig_id,
  //         inputs: selectedOptions,
  //       },
  //       {
  //         onSuccess: () => {
  //           setSelectedOptions([]);
  //           setMessage("Form submit Successfully");
  //           setShowSuccessPage(true);
  //           setTimeout(() => {
  //             setOpenModal(false);
  //             setMessage("");
  //           }, 3000);
  //         },
  //       }
  //     );
  //   }
  // };

  const formElements = (inputData: Input_config) => {
    if (inputData.type === "radio") {
      return (
        <>
          <Box className="pb-[7px]">
            <Section py="1" px="3">
              <Text as="label" className="block mb-3 text-md font-medium text-gray-700">
                {inputData.name}
              </Text>
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
    if (
      inputData.type === "text" ||
      inputData.type === "password" ||
      inputData.type === "email" ||
      inputData.type === "date"
    )
      return (
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
        <Box className="pb-[7px]">
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

  return (
    <Dialog>
      <div className="bg-rose-400 h-[500px]">h1</div>
      <div className="bg-white flex px-3 items-center py-2">
        <DialogTrigger asChild onClick={() => setTriggerType(dialogTrigger.FORM)}>
          <Button size="sm" className="w-[166px]">
            {"Join Now"}
          </Button>
        </DialogTrigger>
        {triggerType === dialogTrigger.FORM && (
          <DialogContent
            animate={Animate.SLIDE}
            className={cn("bg-[#F8F9FB] top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}
          >
            <Box className="bg-[#F8F9FB] px-4 space-y-4 max-h-[600px] rounded-md overflow-y-scroll">
              <div className="fixed top-0 left-0 w-full h-5 flex items-center bg-[#F8F9FB] z-10">
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
              <div className="mx-auto flex flex-col  bg-[#F8F9FB] justify-center flex-wrap gap-y-5 w-full">
                <Flex direction="column" justify="center" className="w-full h-full">
                  {form &&
                    form.formdetails_configs.map((formData: any, formIndex) => (
                      <div key={formIndex} className="my-1 px-2">
                        {formElements(formData.input_config)}
                      </div>
                    ))}
                  <Box>
                    <Heading className="text-black text-[25px] font-[700]">Join Event</Heading>
                    <div className="mt-7">
                      <input
                        className="bg-white w-full shadow-md py-3 rounded-lg px-2 active:border-0 active:border-white "
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mt-5">
                      <input
                        className="bg-white w-full shadow-md py-3 rounded-lg px-2 "
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="mt-5">
                      <input
                        className="bg-white w-full shadow-md py-3 rounded-lg px-2 "
                        placeholder="Enter your position"
                      />
                    </div>
                    <div className="mt-5">
                      <textarea
                        rows={6}
                        className="bg-white w-full shadow-md py-3 rounded-lg px-2 "
                        placeholder="Explain the reason why you want to join this event"
                      />
                    </div>
                  </Box>
                </Flex>
              </div>
              <Section py="1" className="mt-3" px="3">
                <Button className="w-full mt-4">Submit</Button>
              </Section>
            </Box>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
};

export default ReviewInformation;
