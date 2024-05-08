"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Text } from "@/components/ui/Typo/Text";
import { useCreateEducation } from "@/services/education";
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


const validationSchema = yup.object({
  school_name: yup.string().required("School is required!"),
  degree: yup.string().required("Degree is required!"),
  start_date: yup.string().required("Start Date is required!"),
  end_date: yup.string(),
});

const CreateEducation: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { trigger, isMutating } = useCreateEducation();
  const [isPresent, setIsPresent] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: any) => {
    const submitData = {
      ...data,
      is_present: isPresent,
    };
    await trigger(submitData, {
      onSuccess: () => {
        router.replace(`/profile/${id}/education`);
      },
    });
  };

  const educationalAttainmentOptions = ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD"];
  const locationList = ["Yangon , Myanmar", "Mandalay , Myanmar"];

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1" className="">
            <div className="mb-[45px]">
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

            <Box className="pb-[0px]">
              <Section className="" py="4" px="3">
                <p className="text-[14px] font-[400] text-[#222222] ms-3"> Educational Attainment</p>
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
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
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          className="bg-white"
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
                          placeholder="Ex: Bachelor, Diploma"
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

            <Box className="pt-[0px]">
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

export default CreateEducation;
