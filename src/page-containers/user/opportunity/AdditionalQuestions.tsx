/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
"use client";
import { useContentForm, useLikeContent, useSaveContent } from "@/services/content";
import { ContentData, Input_config, Input_options } from "@/types/Content";
import { getToken } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex, Section } from "@radix-ui/themes";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { InputText } from "@/components/ui/Inputs";
import { Autocomplete, Item } from "@/components/ui/Inputs/Autocomplete";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Radio, RadioItem } from "@/components/ui/Inputs/Radio";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useStore } from "@/lib/store";
import CardBox from "@/components/ui/Card";
import HeaderText from "../profile/components/HeaderText";

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

const AdditionalQuestions: React.FC<Props> = () => {
  const opportunityData = useStore(state => state.opportunityData);
  const { data, mutate, comments, setComments } = opportunityData?.someData || {};
  const { trigger: like } = useLikeContent();
  const setOpportunityData = useStore(state => state.setOpportunityData);
  const router = useRouter();
  const { trigger: contentSave } = useSaveContent();
  const { trigger: postForm, isMutating } = useContentForm();
  const form = useMemo(() => {
    if (data?.type === "event") return data.content_event?.form_config;
    if (data?.type === "opportunity") return data.content_opportunity?.form_config;
    if (data?.type === "article") return data.content_article?.form_config;
  }, [data]);
  const [selectedOptions, setSelectedOptions] = useState<
    { inputconfig_id: number | string; value: string | Date }[] | []
  >([]);
  const [message, setMessage] = useState<string>("");
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
    console.log(data);
    console.log(form);
  }, [opportunityData]);

  const handleNext = (_: undefined) => {
    setOpportunityData({ someData: AllOppoData });
    router.push("/opportunity");
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

  const formSubmit = () => {
    if (data && data.content_event) {
      postForm(
        {
          content_id: data.id,
          formconfig_id: data.content_event.formconfig_id,
          inputs: selectedOptions,
        },
        {
          onSuccess: response => {
            setSelectedOptions([]);
            setMessage("Form submit Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            router.push("application-status");
            console.log("Response from content event form submit:", response);
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
          onSuccess: response => {
            setSelectedOptions([]);
            setMessage("Form submit Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            router.push("application-status");
            console.log("Response from content opportunity form submit:", response);
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
          onSuccess: response => {
            setSelectedOptions([]);
            setMessage("Form submit Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            router.push("application-status");
            console.log("Response from content article form submit:", response);
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
    <>
      <HeaderText text={"Additional Questions"} />
      <CardBox className=" relative bottom-[30px]">
        <div className="bg-white flex px-3 items-center">
          <CardBox asChild children={undefined}></CardBox>
          <CardBox asChild>
            <CardBox className={cn("bg-white top-[initial] bottom-0 px-0 py-2 translate-y-0 rounded-16px-tl-tr")}>
              <Box className="bg-white px-4 space-y-4  rounded-md overflow-y-scroll">
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
                      form.formdetails_configs.map((formData: any, formIndex: React.Key | null | undefined) => (
                        <div key={formIndex} className="my-1 px-2">
                          {formElements(formData.input_config)}
                        </div>
                      ))}
                    <div className="w-full min-h-full pt-2 px-2">
                      <Flex>
                        <Checkbox className="me-3" onCheckedChange={(val: boolean) => setChecked(val)} />
                        <Flex direction="column">
                          <Text>
                            By submitting this form, I confirm that I have read, understood and given my consent for
                            Prudential Assurance Company Singapore and its related corporations, respective
                            representatives, agents, third party service providers, contractors and/or appointed
                            distribution/business partners (collectively referred to as “Prudential”), and Small and
                            Medium-sized Enterprises (“SME”) to collect, use, disclose and/or process my/our personal
                            data for the purpose(s) of:
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
                                on how I may access and correct my personal data or withdraw consent to the collection,
                                use or disclosure of my personal data.
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
            </CardBox>
          </CardBox>
        </div>
      </CardBox>
    </>
  );
};

export default AdditionalQuestions;
