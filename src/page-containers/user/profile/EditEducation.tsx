"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useDeleteEducation, useGetEducationById, useUpdateEducation } from "@/services/education";
import { USER_ROLE } from "@/shared/enums";
import { EducationById } from "@/types/Education";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/Inputs/Select";

const validationSchema = yup.object({
  school_name: yup.string().required("School is required!"),
  degree: yup.string().required("Degree is required!"),
  start_date: yup.string().required("Start Date is required!"),
  end_date: yup.string(),
});

const EditEducation: React.FC = () => {
  const { id, edu_id } = useParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { data: educationData } = useGetEducationById<EducationById>(edu_id as string);
  const { trigger, isMutating } = useUpdateEducation();
  const { trigger: deleteTrigger, isMutating: deleteMutating } = useDeleteEducation();
  const [isPresent, setIsPresent] = useState<boolean>();

  const form = useForm({
    resolver: yupResolver(validationSchema as any),
    defaultValues: {
      school_name: educationData?.data?.school_name,
      degree: educationData?.data?.degree,
      start_date: dayjs(educationData?.data?.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(educationData?.data?.end_date).format("YYYY-MM-DD"),
    },
  });

  const submit = async (data: any) => {
    const newData = {
      ...data,
      is_present: isPresent,
      educationId: edu_id as string,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
    };
    await trigger(newData, {
      onSuccess: () => {
        // router.replace(`/profile/${id}/education`);
        router.back();
      },
    });
  };

  const handleDelete = async () => {
    await deleteTrigger(
      { edu_id: edu_id as string },
      {
        onSuccess: () => {
          router.replace(`/profile/${id}/education`);
        },
      }
    );
  };

  useEffect(() => {
    form.setValue("school_name", educationData?.data?.school_name || "");
    form.setValue("degree", educationData?.data?.degree || "");
    form.setValue("start_date", dayjs(educationData?.data?.start_date).format("YYYY-MM-DD") || "");
    form.setValue("end_date", dayjs(educationData?.data?.end_date).format("YYYY-MM-DD") || "");
    setIsPresent(educationData?.data?.is_present);
  }, [form, educationData?.data]);


   const educationalAttainmentOptions = ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD"];
   const locationList = ["Yangon , Myanmar", "Mandalay , Myanmar"];

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="between" align="center" className="" p="3">
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                  </div>
                  <Text size="3" weight="medium">
                    Edit Education
                  </Text>
                  <Link href={`/profile/${id}/education/create`} className="opacity-0">
                    <Icons.plus className="text-primary w-[23px] h-[23px]" />
                  </Link>
                </Flex>
              </div>
            </div>

            {/* <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222]">School</p>
                <FormField
                  control={form.control}
                  name="school_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Ex: Boston University"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box> */}

            <Box className="pb-[0px]">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3"> Educational Attainment</p>
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                      // onValueChange={(value: string) => {
                      //   handleInput(inputData.id, value);
                      // }}
                      // defaultValue={inputData.input_options[0].value}
                      >
                        <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
                          Ex: Bachelor, Diploma
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {educationalAttainmentOptions.map((dropdown, index) => (
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
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Major</p>
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          className="bg-white"
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Ex: Computer Science"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="pb-[0px]">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">School</p>
                <FormField
                  control={form.control}
                  name="school_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          className="bg-white"
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Ex: Boston University"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            {/* <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  Degree
                </Heading>
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Ex: Bachelor, Diploma"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box> */}

            <Box className="pb-[0px]">
              <Section className="" py="4" px="3">
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
                              "font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none rounded-md"
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
              <Section className="" py="4" px="3">
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
                              "font-light shadow-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none rounded-md"
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
              <Section className="bg-white" py="1" px="3">
                <Flex className="items-center">
                  <Checkbox
                    defaultChecked={isPresent}
                    checked={isPresent}
                    onCheckedChange={() => setIsPresent(!isPresent)}
                  />
                  <Text className="pl-2">Currently Studying</Text>
                </Flex>
              </Section>
            </Box>
            {/* {!isPresent && (
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
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
                </Section>
              </Box>
            )} */}

            <Box className="pt-[20px]">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Location</p>
                <FormField
                  control={form.control}
                  name="degree"
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

            <Box className="pb-[7px]">
              <Section py="4" px="3" className="space-y-[15px]">
                <Button type="submit" loading={isMutating} className="bg-primary w-full h-[40px]">
                  Add Education
                </Button>
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
                <Flex className=" justify-end gap-3">
                  <Button
                    type="submit"
                    onClick={() => router.back()}
                    loading={isMutating}
                    className="bg-primary h-[40] px-[35px]"
                  >
                    Back
                  </Button>
                  <Button type="submit" loading={isMutating} className="bg-primary h-[40] px-[35px]">
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

export default EditEducation;
