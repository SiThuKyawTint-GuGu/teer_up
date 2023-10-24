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
import { USER_ROLE } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { Gender } from "@/types/User";
import { getUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  gender: yup.string().required("Gender is required!"),
  email: yup.string().email(),
  day: yup.date().required("Day is required!").typeError("Invalid date"),
  month: yup.date().required("Month is required!").typeError("Invalid date"),
  year: yup.date().required("Year is required!").typeError("Invalid date"),
});

const PersonalInfo: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const userInfo = getUserInfo();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: genders, isLoading: genderLoading } = useGetGenders<Gender[]>();
  const { trigger } = useUpdatePersonalInfo();
  const userProfile = profileData?.data;
  const defaultChecked = userProfile?.personal_info?.gender?.id.toString() || "1";

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: any) => {
    const day = dayjs(data?.day).format("DD");
    const month = dayjs(data?.month).format("MM");
    const year = dayjs(data?.year).year();

    const newData = {
      gender_id: Number(data.gender),
      birthday: `${year}-${month}-${day}`,
    };

    await trigger(newData, {
      onSuccess: () => {
        router.push("/profile");
      },
    });
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
                                    className="block pb-[10px] border-b border-b-[#BDC7D5]"
                                  >
                                    <Flex justify="between" align="center">
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
                                className="w-[65px]"
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
                                className="w-[65px]"
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
                                className="w-[65px]"
                              />
                              <Icons.arrowDown />
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
                          <InputText
                            type="text"
                            inputType={USER_ROLE.STUDENT}
                            defaultValue={userProfile?.email}
                            disabled
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
