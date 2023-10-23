"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useCreateEducation } from "@/services/education";
import { useGetUserById } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  school_name: yup.string().required("School is required!"),
  degree: yup.string().required("Degree is required!"),
  start_date: yup.date().required("Start date is required!").typeError("Invalid date"),
  end_date: yup.date().required("End date is required!").typeError("Invalid date"),
});

const CreateEducation: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { trigger } = useCreateEducation();
  const userProfile = profileData?.data;

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: {
    school_name: string;
    degree: string;
    start_date: any;
    end_date: any;
  }) => {
    const newData = {
      ...data,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
    };
    await trigger(newData, {
      onSuccess: () => {
        router.push(`/profile/${id}/education`);
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
            <Flex justify="between" align="center" className="bg-white" p="3">
              <Link href="/profile">
                <Icons.caretLeft className="text-[#373A36] w-[23px] h-[23px]" />
              </Link>
              <Text size="3" weight="medium">
                Add Education
              </Text>
              <Link href={`/profile/${id}/education/create`} className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  School
                </Heading>
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
            </Box>

            <Box className="pb-[7px]">
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
            </Box>

            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  Start Date
                </Heading>
                <FormField
                  control={form.control}
                  name="start_date"
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CardBox className="px-[12px] py-[16px] flex justify-between items-center">
                          <ReactDatePicker
                            selected={dayjs(field.value).toDate()}
                            onChange={date => field.onChange(dayjs(date).format())}
                            dateFormat="dd/MM/yyyy"
                            className="w-full"
                          />
                          <Icons.calender />
                        </CardBox>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Section>
            </Box>

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
                            className="w-full"
                          />
                          <Icons.calender />
                        </CardBox>
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
          </Grid>
        </form>
      </Form>
    </>
  );
};

export default CreateEducation;
