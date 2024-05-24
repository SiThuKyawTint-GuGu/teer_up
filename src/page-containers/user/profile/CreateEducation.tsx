/* eslint-disable no-unused-vars */
"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useCreateEducation } from "@/services/education";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Inputs/Select";
import { useGetDegreeBySchoolId, useGetMajorsByDegreeId, useGetMajorsBySchoolId, useGetSchools } from "@/services/school";
import { DegreeListResponse, MajorListResponse, SchoolListResponse } from "@/types/School";
import { InputText } from "@/components/ui/Inputs";

const validationSchema = yup.object({
  degree: yup.string(),
  major: yup.string(),
  start_date: yup.string().required("Start  is required!"),
  end_date: yup.string(),
  school: yup.string(),
  location_id: yup.string(),
  other_school_name: yup.string(),
  other_school_degree: yup.string(),
  other_school_major: yup.string(),
});


const CreateEducation: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { trigger, isMutating } = useCreateEducation();
  const [selectedSchoolId, setSelectedSchoolId] = useState<any | null>(null);
  const [selectedMajorId, setSelectedMajorId] = useState<any | null>(null);
  const [selectedDegreeId, setSelectedDegreeId] = useState<any | null>(null);
  const [statusOption, setStatusOption] = useState<boolean | null>(false);
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const { data: schoolList } = useGetSchools<SchoolListResponse>();
  const { data: degreeList } = useGetDegreeBySchoolId<DegreeListResponse,any>({ id: selectedSchoolId });
  const { data: majorList } = useGetMajorsByDegreeId<MajorListResponse,any>({ id: selectedDegreeId});

  
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const submit = async (data: any) => {
       const submitData = {
         ...data,
         degree_id: parseInt(selectedDegreeId, 10),
         school_id: parseInt(selectedSchoolId, 10),
         major_id: parseInt(selectedMajorId, 10),
         is_present: isPresent,
       };
       console.log(submitData);

    await trigger(submitData, {
      onSuccess: () => {
        router.replace(`/profile/${id}/education`);
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1" className="">
            <div className="mb-[15px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="between" align="center" className="" p="3">
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                  </div>
                  <Text size="3" weight="medium">
                    Add Education
                  </Text>
                  <Link href={`/profile/${id}/education/create`} className="opacity-0">
                    <Icons.plus className="text-primary w-[23px] h-[23px]" />
                  </Link>
                </Flex>
              </div>
            </div>

            {statusOption === false ? (
              <>
                <Box className="">
                  <Section className="" py="4" px="3">
                    <p className="text-[14px] font-[400] text-[#222222] ms-3">School</p>
                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value: string) => {
                                const selectedSchool = schoolList?.data?.find(item => item.name === value);
                                setSelectedSchoolId(selectedSchool ? String(selectedSchool.id) : null);
                                field.onChange(selectedSchool?.name || "");
                              }}
                              value={field.value}
                            >
                              <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
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

                <Box className="pb-[0px]">
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
                                field.onChange(selectedDegree?.name || "");
                              }}
                              value={field.value}
                            >
                              <SelectTrigger
                                disabled={!selectedSchoolId}
                                className="border-none outline-none shadow-md bg-white border-gray-700 "
                              >
                                {field.value || "Select a Degree"}
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {degreeList?.data?.map((major: any, index: any) => (
                                  <SelectItem key={index} value={major.name}>
                                    <Text>{major.name}</Text>
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

                <Box className="pb-[0px]">
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
                                field.onChange(selectedMajor?.name || "");
                                field.onChange(value);
                              }}
                              value={field.value}
                            >
                              <SelectTrigger
                                disabled={!selectedDegreeId}
                                className="border-none outline-none shadow-md bg-white border-gray-700 "
                              >
                                {field.value || "Select a Major"}
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {majorList?.data?.map((major: any, index: any) => (
                                  <SelectItem key={index} value={major.name}>
                                    <Text>{major.name}</Text>
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
              </>
            ) : (
              <>
                <Box className="">
                  <Section className="" py="4" px="3">
                    <p className="text-[14px] font-[400] text-[#222222] ms-3">School</p>
                    <FormField
                      control={form.control}
                      name="other_school_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputText type="text" className="bg-white" placeholder="Enter School Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Section>
                </Box>

                <Box className="pb-[0px]">
                  <Section className="" py="4" px="3">
                    <p className="text-[14px] font-[400] text-[#222222] ms-3">Degree</p>
                    <FormField
                      control={form.control}
                      name="other_school_degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputText type="text" className="bg-white" placeholder="Enter Degree Name" {...field} />
                          </FormControl>
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
                      name="other_school_major"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputText type="text" className="bg-white" placeholder="Enter Major Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Section>
                </Box>
              </>
            )}

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
              <Section className="" py="4" px="3">
                <Flex className="items-center">
                  <Checkbox defaultChecked={isPresent} onCheckedChange={() => setIsPresent(!isPresent)} />
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
                </Section>
              </Box>
            )} */}

            {/* <Box className="pt-[0px]">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Location</p>
                <FormField
                  control={form.control}
                  name="location_id"
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
            </Box> */}

            <Box className="">
              <Section py="4" px="3">
                <Button type="submit" loading={isMutating} className="bg-primary w-full">
                  Save
                </Button>
              </Section>
            </Box>
          </Grid>
        </form>
      </Form>
      <Box className="mx-3">
        <Button onClick={() => setStatusOption(!statusOption)} className="w-full">
          {statusOption === false ? " Add Other School" : " Add Normal"}
        </Button>
      </Box>
    </>
  );
};

export default CreateEducation;
