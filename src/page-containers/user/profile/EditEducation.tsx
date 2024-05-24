/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useDeleteEducation, useGetEducationById, useUpdateEducation } from "@/services/education";
import { EducationById } from "@/types/Education";
import { cn } from "@/utils/cn";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Inputs/Select";
import { useGetDegreeBySchoolId, useGetMajorsByDegreeId, useGetSchools } from "@/services/school";
import { DegreeListResponse, MajorListResponse } from "@/types/School";
import { InputText } from "@/components/ui/Inputs";

const EditEducation: React.FC = () => {
  const { id, edu_id } = useParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { data: educationData, isLoading } = useGetEducationById<EducationById>(edu_id as string);
  const { trigger, isMutating } = useUpdateEducation();
  const { trigger: deleteTrigger, isMutating: deleteMutating } = useDeleteEducation();
  const [selectedMajorId, setSelectedMajorId] = useState<any | null>(null);
  const [selectedDegreeId, setSelectedDegreeId] = useState<any | null>(null);
  const { data: schoolList } = useGetSchools<any>();
  const [isPresent, setIsPresent] = useState<boolean>();
  const [selectedSchoolId, setSelectedSchoolId] = useState<any>(null);
  const { data: degreeList } = useGetDegreeBySchoolId<DegreeListResponse, any>({
    id: selectedSchoolId,
  });
  const { data: majorList } = useGetMajorsByDegreeId<MajorListResponse, any>({
    id: selectedDegreeId,
  });

  const form = useForm({
    defaultValues: {
      school: "",
      degree: "",
      start_date: "",
      end_date: "",
      major: "",
      other_school_name: "",
      other_school_major: "",
      other_school_degree: "",
    },
  });

  useEffect(() => {
    if (educationData) {
      form.setValue("school", educationData?.data.school?.name || "");

      form.setValue("major", educationData?.data.major?.name || "");
      form.setValue("other_school_major", educationData?.data.other_school_major || "");
      form.setValue("other_school_degree", educationData?.data.other_school_degree || "");
      form.setValue("other_school_name", educationData?.data.other_school_name || "");
      form.setValue("start_date", dayjs(educationData?.data?.start_date).format("YYYY-MM-DD") || "");
      form.setValue("end_date", dayjs(educationData?.data?.end_date).format("YYYY-MM-DD") || "");
      setIsPresent(educationData?.data.is_present);
      setSelectedSchoolId(educationData?.data.school?.id || null);
    }
  }, [educationData, form, schoolList]);

  useEffect(() => {
    form.setValue("degree", educationData?.data.degree_relation?.name || "");
    setSelectedDegreeId(educationData?.data.degree_relation?.id || null);
  }, [degreeList]);

  useEffect(() => {
    form.setValue("major", educationData?.data.major?.name || "");
    setSelectedMajorId(educationData?.data.major?.id || null);
  }, [majorList]);

  const handleSchoolChange = (value: string) => {
    const selectedSchool = schoolList?.data?.find((item: { name: string }) => item.name === value);
    setSelectedSchoolId(selectedSchool ? String(selectedSchool.id) : null);
    form.setValue("school", value);
    form.setValue("degree", "");
    form.setValue("major", "");
    setSelectedDegreeId(null);
    setSelectedMajorId(null);
  };

  const submit = async (data: any) => {
    let endDate = null;
    if (data.end_date && !isNaN(new Date(data.end_date).getTime())) {
      endDate = dayjs(data.end_date).format("YYYY-MM-DD");
    }

    const newData = {
      ...data,
      is_present: isPresent,
      school_id: parseInt(selectedSchoolId, 10) ? parseInt(selectedSchoolId, 10) : null,
      major_id: parseInt(selectedMajorId, 10) ? parseInt(selectedMajorId, 10) : null,
      degree_id: parseInt(selectedDegreeId, 10) ? parseInt(selectedDegreeId, 10) : null,
      educationId: edu_id as string,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      end_date: endDate,
    };
    await trigger(newData, {
      onSuccess: () => {
        router.replace(`/profile/${id}/education`);
        router.back();
      },
    });
  };

  // const handleDelete = async () => {
  //   await deleteTrigger(
  //     { edu_id: edu_id as string },
  //     {
  //       onSuccess: () => {
  //         router.replace(`/profile/${id}/education`);
  //       },
  //     }
  //   );
  // };

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0  w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
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

            <Box className="">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">School</p>
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={handleSchoolChange} value={field.value}>
                          <SelectTrigger
                            disabled={educationData?.data?.other_school_name}
                            className="border-none outline-none shadow-md bg-white border-gray-700 "
                          >
                            {field.value || "Select a School"}
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {schoolList?.data?.map((item: any, index: any) => (
                              <SelectItem key={index} value={item.name}>
                                <Text>{item.name}</Text>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Degree</p>
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value: string) => {
                            const selectedDegree = degreeList?.data?.find(
                              (item: { name: string }) => item.name === value
                            );
                            setSelectedDegreeId(selectedDegree ? String(selectedDegree.id) : null);
                            field.onChange(value);
                            form.setValue("major", "");
                            setSelectedMajorId(null);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger
                            disabled={educationData?.data?.other_school_name}
                            className="border-none outline-none shadow-md bg-white border-gray-700"
                          >
                            {field.value || "Select a Degree"}
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {degreeList?.data?.map((item: any, index: any) => (
                              <SelectItem key={index} value={item.name}>
                                <Text>{item.name}</Text>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Major</p>
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value: string) => {
                            const selectedMajor = majorList?.data?.find(
                              (item: { name: string }) => item.name === value
                            );
                            setSelectedMajorId(selectedMajor ? String(selectedMajor.id) : null);
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger
                            disabled={educationData?.data?.other_school_name}
                            className="border-none outline-none shadow-md bg-white border-gray-700"
                          >
                            {field.value || "Select a Major"}
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {majorList?.data?.map((item: any, index: any) => (
                              <SelectItem key={index} value={item.name}>
                                <Text>{item.name}</Text>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

            <Box className="">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Other School (Optional)</p>
                <FormField
                  control={form.control}
                  name="other_school_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          disabled={selectedSchoolId}
                          type="text"
                          className="bg-white"
                          placeholder="Enter Other School Name"
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
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Other Degree (Optional)</p>
                <FormField
                  control={form.control}
                  name="other_school_degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          disabled={selectedSchoolId}
                          type="text"
                          className="bg-white"
                          placeholder="Enter Other Degree Name"
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
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Other Major (Optional)</p>
                <FormField
                  control={form.control}
                  name="other_school_major"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          disabled={selectedSchoolId}
                          type="text"
                          className="bg-white"
                          placeholder="Enter Other Major Name"
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
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Start date</p>
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
                <p className="text-[14px] font-[400] text-[#222222] ms-3">End date</p>
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

            <Box className="pb-[7px]">
              <Section py="4" px="3" className="space-y-[15px]">
                <Button className="bg-primary w-full h-[40px]">Add Education</Button>
                <Flex className=" justify-end gap-3">
                  <Button onClick={() => router.back()} className="bg-primary h-[40] px-[35px]">
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
