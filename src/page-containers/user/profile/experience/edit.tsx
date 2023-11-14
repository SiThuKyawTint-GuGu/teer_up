"use client";
import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputText } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import {
  ExperienceParamsType,
  useDeleteExperience,
  useGetUserExperiences,
  useUpdateExperience,
} from "@/services/experience";
import { USER_ROLE } from "@/shared/enums";
import { ExperienceResponse } from "@/types/Experience";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  company: yup.string().required("School is required!"),
  position: yup.string().required("Degree is required!"),
  start_date: yup.date().required("Start date is required!").typeError("Invalid date"),
  end_date: yup.date().required("End date is required!").typeError("Invalid date"),
});

const EditExperience: React.FC = () => {
  const { id, exp_id } = useParams();
  const router = useRouter();
  const { trigger, isMutating } = useUpdateExperience();
  const { trigger: deleteTrigger, isMutating: deleteMutating } = useDeleteExperience();
  const { data: experiences } = useGetUserExperiences<ExperienceParamsType, ExperienceResponse>();

  const experience = useMemo(
    () => experiences?.data?.find(each => each.id.toString() === exp_id.toString()),
    [experiences, exp_id]
  );

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      company: experience?.company,
      position: experience?.position,
    },
  });

  const submit = async (data: { company: string; position: string; start_date: any; end_date: any }) => {
    const newData = {
      ...data,
      exp_id: exp_id as string,
    };

    await trigger(newData, {
      onSuccess: () => {
        router.push(`/profile/${id}/experience`);
      },
    });
  };

  const handleDelete = async () => {
    await deleteTrigger(
      { exp_id: exp_id as string },
      {
        onSuccess: () => {
          router.push(`/profile/${id}/experience`);
        },
      }
    );
  };

  useEffect(() => {
    form.setValue("company", experience?.company || "");
    form.setValue("position", experience?.position || "");
  }, [form, experience]);

  console.log("experience => ", experience);

  return (
    <>
      <Form {...form}>
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-full" onSubmit={form.handleSubmit(submit)}>
          <Grid columns="1" pb="9">
            <div className="mb-[45px]">
              <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
                <Flex justify="between" align="center" className="bg-white" p="3">
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
                  </div>
                  <Text size="3" weight="medium">
                    Edit Experience
                  </Text>
                  <Link href={`/profile/${id}/education/create`} className="opacity-0">
                    <Icons.plus className="text-primary w-[23px] h-[23px]" />
                  </Link>
                </Flex>
              </div>
            </div>

            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  Company
                </Heading>
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

            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="2" weight="medium" align="left" mb="2">
                  Position
                </Heading>
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
              </Section>
            </Box>

            <Box className="pb-[7px]">
              <Section py="4" px="3" className="space-y-[15px]">
                <Button type="submit" loading={isMutating} className="bg-primary w-full">
                  Save
                </Button>
                <Button
                  type="button"
                  loading={deleteMutating}
                  onClick={handleDelete}
                  variant="outline"
                  className="border-primary w-full"
                  spinnerColor="#DA291C"
                >
                  Delete
                </Button>
              </Section>
            </Box>
          </Grid>
        </form>
      </Form>
    </>
  );
};

export default EditExperience;
