"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Radio, RadioItem } from "@/components/ui/Inputs/Radio";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetGenders, useGetUserById, useUpdatePersonalInfo } from "@/services/user";
import { UserProfileResponse } from "@/types/Profile";
import { Gender } from "@/types/User";
import { cn } from "@/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  gender: yup.string(),
  email: yup.string().email(),
  name: yup.string().required("Name is required!"),
  birthday: yup.string().required("Birthday is required!"),
  // day: yup.date().required("Day is required!").typeError("Invalid date"),
  // month: yup.date().required("Month is required!").typeError("Invalid date"),
  // year: yup.date().required("Year is required!").typeError("Invalid date"),
});

const PersonalInfo: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: genders } = useGetGenders<Gender[]>();
  const { trigger, isMutating } = useUpdatePersonalInfo();
  const userProfile = profileData?.data;
  const defaultChecked = userProfile?.personal_info?.gender?.id.toString() || "1";

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: userProfile?.name,
      birthday: dayjs(userProfile?.personal_info?.birthday).format("YYYY-MM-DD"),
    },
  });

  const submit = async (data: any) => {
    // const day = dayjs(data?.day).format("DD");
    // const month = dayjs(data?.month).format("MM");
    // const year = dayjs(data?.year).year();

    const newData = {
      ...data,
      gender_id: Number(data.gender) || +defaultChecked,
      name: data.name,
    };

    await trigger(newData, {
      onSuccess: () => {
        router.push(`/profile/${id}`);
      },
    });
  };

  useEffect(() => {
    form.setValue("name", userProfile?.name || "");
    form.setValue("birthday", dayjs(userProfile?.personal_info?.birthday).format("YYYY-MM-DD") || "");
  }, [form, userProfile]);

  return (
    <>
      <Grid columns="1">
        <Box className="pb-[55px]">
          <Form {...form}>
            <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
              <Grid columns="1">
                <Box>
                  <div className="mb-[45px]">
                    <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                      <Flex justify="between" align="center" className="bg-white" p="3">
                        <div onClick={() => router.back()}>
                          <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                        </div>
                        <Text size="3" weight="medium">
                          Personal Information
                        </Text>
                        <Link href="/" className="opacity-0">
                          <Icons.plus className="text-primary w-[23px] h-[23px]" />
                        </Link>
                      </Flex>
                    </div>
                  </div>

                  <CardBox className="mb-[7px] rounded-none">
                    <Section className="bg-white" py="4" px="3">
                      <Flex justify="between" align="center" mb="4">
                        <Heading as="h6" size="4" align="left">
                          Gender
                        </Heading>
                      </Flex>
                      {defaultChecked && (
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
                                    defaultValue={defaultChecked}
                                  >
                                    {genders?.map((each, key) => (
                                      <Label
                                        key={key}
                                        className={cn(
                                          "block pb-[10px]",
                                          key !== (genders ? genders.length - 1 : -1) && "border-b border-b-[#BDC7D5]"
                                        )}
                                      >
                                        <Flex className="capitalize" justify="between" align="center">
                                          {each.type}
                                          <RadioItem value={each.id.toString()} />
                                        </Flex>
                                      </Label>
                                    ))}
                                  </Radio>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      )}
                    </Section>
                  </CardBox>
                  <CardBox className="mb-[7px] rounded-none">
                    <Section className="bg-white" py="4" px="3">
                      <Heading as="h6" size="4" align="left" mb="4">
                        Birthday
                      </Heading>
                      <FormField
                        control={form.control}
                        name="birthday"
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
                                  // value={
                                  //   field.value || dayjs(userProfile?.personal_info?.birthday).format("YYYY-MM-DD")
                                  // }
                                  // onChange={e => field.onChange(e.target.value)}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </Section>
                  </CardBox>
                  {/* <CardBox className="mb-[7px] rounded-none">
                    <Section className="bg-white" py="4" px="3">
                      <Heading as="h6" size="4" align="left" mb="4">
                        Birthday
                      </Heading>
                      <Flex justify="start" align="center" gap="4">
                        <FormField
                          control={form.control}
                          name="day"
                          defaultValue={
                            userProfile?.personal_info?.birthday
                              ? new Date(userProfile?.personal_info?.birthday)
                              : new Date()
                          }
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                                  <ReactDatePicker
                                    selected={dayjs(field.value).toDate()}
                                    onChange={date => field.onChange(dayjs(date).format())}
                                    dateFormat="dd"
                                    className="w-[65px] bg-white"
                                  />
                                  <Icons.arrowDown />
                                </CardBox>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="month"
                          control={form.control}
                          defaultValue={
                            userProfile?.personal_info?.birthday
                              ? new Date(userProfile?.personal_info?.birthday)
                              : new Date()
                          }
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                                  <ReactDatePicker
                                    selected={dayjs(
                                      field.value ? field.value : userProfile?.personal_info?.birthday
                                    ).toDate()}
                                    onChange={date => field.onChange(dayjs(date).format())}
                                    dateFormat="MM"
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                    className="w-[45px] bg-white"
                                  />
                                  <Icons.arrowDown />
                                </CardBox>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="year"
                          defaultValue={
                            userProfile?.personal_info?.birthday
                              ? new Date(userProfile?.personal_info?.birthday)
                              : new Date()
                          }
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                                  <ReactDatePicker
                                    selected={dayjs(
                                      field.value ? field.value : userProfile?.personal_info?.birthday
                                    ).toDate()}
                                    onChange={date => field.onChange(dayjs(date).format())}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    className="w-[65px] bg-white"
                                  />
                                  <Icons.arrowDown />
                                </CardBox>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Flex>
                    </Section>
                  </CardBox> */}
                  <CardBox className="mb-[7px] rounded-none">
                    <Section className="bg-white" py="4" px="3">
                      <Heading as="h6" size="4" align="left" mb="4">
                        Name
                      </Heading>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <InputText
                                  type="text"
                                  className="bg-white shadow-md"
                                  defaultValue={userProfile?.name}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </Section>
                  </CardBox>
                  <CardBox className="mb-[7px] rounded-none">
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
                              <InputText
                                type="text"
                                className="bg-white shadow-md"
                                defaultValue={userProfile?.email}
                                disabled
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </Section>
                  </CardBox>
                  <CardBox className="mb-[7px] rounded-none">
                    <Section py="4" px="3">
                      <Button type="submit" loading={isMutating} className="bg-primary w-full">
                        Save
                      </Button>
                    </Section>
                  </CardBox>
                </Box>
              </Grid>
            </form>
          </Form>
        </Box>
      </Grid>
    </>
  );
};

export default PersonalInfo;
