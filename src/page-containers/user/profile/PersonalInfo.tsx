"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Radio, RadioItem } from "@/components/ui/Inputs/Radio";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetUserById } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  gender: yup.string().required("Gender is required!"),
  email: yup.string().email().required("Email is required!"),
  day: yup.date().required("Day is required!").typeError("Invalid date"),
  month: yup.date().required("Month is required!").typeError("Invalid date"),
  year: yup.date().required("Year is required!").typeError("Invalid date"),
});

const PersonalInfo: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const userProfile = profileData?.data;
  const [startDate, setStartDate] = useState(new Date());

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: { gender: string; email: string }) => {
    console.log("submit data => ", data);
    // await trigger(data, {
    //   onSuccess: res => {
    //     setUserInfo(res.data.token, res.data.data);
    //     router.push("/auth/otp");
    //   },
    // });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mx-auto flex flex-col justify-center gap-y-3 w-full"
          onSubmit={form.handleSubmit(submit)}
        >
          <Grid columns="1">
            <Box>
              <Flex justify="center" className="bg-white" p="3">
                <Text size="3" weight="medium">
                  Personal Information
                </Text>
              </Flex>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Flex justify="between" align="center" mb="4">
                    <Heading as="h6" size="4" align="left">
                      Gender
                    </Heading>
                  </Flex>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Radio
                              className="space-y-[10px]"
                              onValueChange={val => field.onChange(val)}
                            >
                              <Label className="block pb-[10px] border-b border-b-[#BDC7D5]">
                                <Flex justify="between" align="center">
                                  Female
                                  <RadioItem value="female" defaultChecked />
                                </Flex>
                              </Label>
                              <Label className="block pb-[10px] border-b border-b-[#BDC7D5]">
                                <Flex justify="between" align="center">
                                  Male
                                  <RadioItem value="male" />
                                </Flex>
                              </Label>
                              <Label className="block pb-[10px] border-b border-b-[#BDC7D5]">
                                <Flex justify="between" align="center">
                                  More options
                                  <RadioItem value="other" />
                                </Flex>
                              </Label>
                            </Radio>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Birthday
                  </Heading>
                  <Flex justify="start" align="center" gap="4">
                    <FormField
                      control={form.control}
                      name="day"
                      defaultValue={new Date()}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                              <ReactDatePicker
                                selected={dayjs(field.value).toDate()}
                                onChange={date => field.onChange(dayjs(date).format())}
                                dateFormat="dd"
                                className="w-[65px]"
                              />
                              <Icons.caretDown />
                            </CardBox>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="month"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                              <ReactDatePicker
                                selected={dayjs(field.value).toDate()}
                                onChange={date => field.onChange(dayjs(date).format())}
                                dateFormat="MM"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                className="w-[65px]"
                              />
                              <Icons.caretDown />
                            </CardBox>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      defaultValue={new Date()}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                              <ReactDatePicker
                                selected={dayjs(field.value).toDate()}
                                onChange={date => field.onChange(dayjs(date).format())}
                                dateFormat="yyyy"
                                showYearPicker
                                className="w-[65px]"
                              />
                              <Icons.caretDown />
                            </CardBox>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Flex>
                </Section>
              </Box>

              <Box className="pb-[7px]">
                <Section className="bg-white" py="4" px="3">
                  <Heading as="h6" size="4" align="left" mb="4">
                    Email
                  </Heading>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputText type="text" inputType={USER_ROLE.STUDENT} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Section>
              </Box>
              <Box className="pb-[7px]">
                <Section py="4" px="3">
                  <Button type="submit" className="bg-primary w-full">
                    Save
                  </Button>
                </Section>
              </Box>
            </Box>
          </Grid>
        </form>
      </Form>
    </>
  );
};

export default PersonalInfo;
