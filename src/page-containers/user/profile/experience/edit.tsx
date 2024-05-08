"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText, InputTextAreaBgWhite } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import {
  ExperienceParamsType,
  useDeleteExperience,
  useGetUserExperiences,
  useUpdateExperience,
} from "@/services/experience";
import { USER_ROLE } from "@/shared/enums";
import { ExperienceResponse } from "@/types/Experience";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import HeaderText from "../components/HeaderText";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/Inputs/Select";


const validationSchema = yup.object({
  company: yup.string().required("School is required!"),
  position: yup.string().required("Degree is required!"),
  start_date: yup.string().required("Start Date is required!"),
  end_date: yup.string(),
});

const EditExperience: React.FC = () => {
  const { id, exp_id } = useParams();
  const router = useRouter();
  const { trigger, isMutating } = useUpdateExperience();
  const { trigger: deleteTrigger, isMutating: deleteMutating } = useDeleteExperience();
  const { data: experiences } = useGetUserExperiences<ExperienceParamsType, ExperienceResponse>();
  const [isPresent, setIsPresent] = useState<boolean>();

  const experience = useMemo(
    () => experiences?.data?.find(each => each.id.toString() === exp_id.toString()),
    [experiences, exp_id]
  );

  const form = useForm({
    resolver: yupResolver(validationSchema as any),
    defaultValues: {
      company: experience?.company,
      position: experience?.position,
      start_date: dayjs(experience?.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(experience?.end_date).format("YYYY-MM-DD"),
    },
  });

  const submit = async (data: any) => {
    const newData = {
      ...data,
      is_present: isPresent,
      exp_id: exp_id as string,
    };
    await trigger(newData, {
      onSuccess: () => {
        // router.replace(`/profile/${id}/experience`);
        router.back();
      },
    });
  };

  const handleDelete = async () => {
    await deleteTrigger(
      { exp_id: exp_id as string },
      {
        onSuccess: () => {
          router.replace(`/profile/${id}/experience`);
        },
      }
    );
  };

  useEffect(() => {
    form.setValue("company", experience?.company || "");
    form.setValue("position", experience?.position || "");
    form.setValue("start_date", dayjs(experience?.start_date).format("YYYY-MM-DD") || "");
    form.setValue("end_date", dayjs(experience?.end_date).format("YYYY-MM-DD") || "");
    setIsPresent(experience?.is_present || false);
  }, [form, experience]);

       const jobType = ["Full Time","Part Time"];
       const locationList = ["Yangon , Myanmar", "Mandalay , Myanmar"];

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1" pb="9">
            <HeaderText text={"Edit Work Experience"} />

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Job Title</p>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText type="text" inputType={USER_ROLE.STUDENT} placeholder="Position" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Employment type</p>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <Select
                    // onValueChange={(value: string) => {
                    //   handleInput(inputData.id, value);
                    // }}
                    // defaultValue={inputData.input_options[0].value}
                    >
                      <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
                        Full Time / Part Time
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {jobType.map((dropdown, index) => (
                          <SelectItem key={index} value={dropdown}>
                            <Text>{dropdown}</Text>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-2">Company name</p>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText type="text" inputType={USER_ROLE.STUDENT} placeholder="Company Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">From date</p>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <input
                            type="date"
                            className={cn(
                              "font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none"
                            )}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">To date</p>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <input
                            type="date"
                            className={cn(
                              "font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none"
                            )}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </Section>
            </Box>
            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <Flex className="items-center">
                  <Checkbox
                    defaultChecked={isPresent}
                    checked={isPresent}
                    onCheckedChange={() => setIsPresent(!isPresent)}
                  />
                  <Text className="pl-2">I currently work here</Text>
                </Flex>
              </Section>
            </Box>
            {/* {!isPresent && (
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  End Date
                </Heading>
                <FormField
                  control={form.control}
                  name="end_date"
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                          <ReactDatePicker
                            selected={dayjs(field.value).toDate()}
                            onChange={date => field.onChange(dayjs(date).format())}
                            dateFormat="dd/MM/yyyy"
                            className="w-full bg-white"
                          />
                          <Icons.calender />
                        </CardBox>
                      </FormControl>
                    </FormItem>
                  )}
                />
                  <Heading as="h6" size="4" align="left" mb="4">
                    End Date
                  </Heading>
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <input
                              type="date"
                              className={cn(
                                "font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none"
                              )}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </Section>
              </Box>
            )} */}
            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Location</p>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                      // onValueChange={(value: string) => {
                      //   handleInput(inputData.id, value);
                      // }}
                      // defaultValue={inputData.input_options[0].value}
                      >
                        <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
                          Yangon , Myanmar
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {locationList.map((dropdown, index) => (
                            <SelectItem key={index} value={dropdown}>
                              <Text>{dropdown}</Text>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-2">Description (optional)</p>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputTextAreaBgWhite
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Describe your work experience"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[7px]">
              <Section py="4" px="3" className="space-y-[15px]">
                <Button type="submit" loading={isMutating} className="bg-primary h-[40px] w-full">
                  Add Work Experience
                </Button>

                <Flex className="justify-end gap-4">
                  {/* <Button
                    type="button"
                    loading={deleteMutating}
                    onClick={handleDelete}
                    variant="outline"
                    className="border-primary w-full"
                    spinnerColor="#DA291C"
                  >
                    Delete
                  </Button> */}
                  <Button
                    type="submit"
                    onClick={() => router.back()}
                    loading={isMutating}
                    className="bg-primary h-[40px] px-[35px]"
                  >
                    Back
                  </Button>
                  <Button type="submit" loading={isMutating} className="bg-primary h-[40px] px-[35px]">
                    Done
                  </Button>
                </Flex>
              </Section>
            </Box>
          </Grid>
        </form>
      </Form>
    </>
  );
};

export default EditExperience;
