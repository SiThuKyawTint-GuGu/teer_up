"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText, InputTextAreaBgWhite } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useCreateExperiences } from "@/services/experience";
import { USER_ROLE } from "@/shared/enums";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Inputs/Select";
import { useGetCountries } from "@/services/country";
import { CountriesResponse } from "@/types/Countries";



const validationSchema = yup.object({
  position: yup.string().required("Job Title is required!"),
  employment_type: yup.string().required("Employment Type is required!"),
  company: yup.string().required("Company Name is required!"),
  start_date: yup.string().required("Form Date is required!"),
  end_date: yup.string(),
  location: yup.string().required("Location is required!"),
  description: yup.string(),
});

const CreateExperience: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { trigger, isMutating } = useCreateExperiences();
  const { data:countries } = useGetCountries<CountriesResponse>();
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [selectedLocationId, setSelectedLocationId] = useState<any | null>(null);

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: any) => {
    const submitData = {
      ...data,
      location_id:selectedLocationId,
      is_present: isPresent,
    };
    console.log(submitData);
    await trigger(submitData, {
      onSuccess: () => {
        router.replace(`/profile/${id}/experience`);
      },
    });
  };


  const handleEmploymentTypeChange = (selectedOptions: any) => {
    form.setValue("employment_type", selectedOptions);
  };

  const handleLocationChange = (selectedOptions: any) => {
    const selectLocation = countries?.data.find((item:any) => item.name === selectedOptions);
     setSelectedLocationId(selectLocation ? selectLocation.id : null);
     form.setValue("location", selectedOptions);
  }

   const jobType = ["fulltime", "parttime", "contract", "internship"];

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="between" align="center" className="bg-white" p="3">
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                  </div>
                  <Text size="3" weight="medium">
                    Add Job Experience
                  </Text>
                  <Link href={`/profile/${id}/education/create`} className="opacity-0">
                    <Icons.plus className="text-primary w-[23px] h-[23px]" />
                  </Link>
                </Flex>
              </div>
            </div>

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Job Title</p>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Enter your job title"
                          {...field}
                        />
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
                  name="employment_type"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={handleEmploymentTypeChange}>
                        <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 capitalize">
                          {field.value || "Full Time / Part Time"}
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {jobType.map((dropdown, index) => (
                            <SelectItem key={index} value={dropdown}>
                              <Text className=" capitalize">{dropdown}</Text>
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
                <p className="text-[14px] font-[400] text-[#222222] ms-3">Company name</p>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          inputType={USER_ROLE.STUDENT}
                          placeholder="Enter company Name"
                          {...field}
                        />
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

            <Box className="pb-[0px]">
              <Section className="bg-white" py="4" px="3">
                <Flex className="items-center">
                  <Checkbox defaultChecked={isPresent} onCheckedChange={() => setIsPresent(!isPresent)} />
                  <Text className="pl-2">
                    <Text className="pl-2">I currently work here</Text>
                  </Text>
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={handleLocationChange}>
                        <SelectTrigger className="border-none outline-none shadow-md bg-white border-gray-700 ">
                          {field.value || "Myanmar"}
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {countries?.data?.map((item:any, index:number) => (
                            <SelectItem key={index} value={item.name}>
                              <Text>{item.name}</Text>
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
                  name="description"
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
              <Section py="4" px="3">
                <Button type="submit" loading={isMutating} className="bg-primary w-full">
                  Save
                </Button>
              </Section>
            </Box>
          </Grid>
        </form>
      </Form>
    </>
  );
};

export default CreateExperience;
