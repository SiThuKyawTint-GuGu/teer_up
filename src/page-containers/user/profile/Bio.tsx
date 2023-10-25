"use client";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Icons } from "@/components/ui/Images";
import { InputTextArea } from "@/components/ui/Inputs";
import { Text } from "@/components/ui/Typo/Text";
import { useUpdateBio } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  bio: yup.string().required("Bio is required!"),
});

const Bio: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { trigger } = useUpdateBio();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (data: { bio: string }) => {
    await trigger(data, {
      onSuccess: () => {
        router.push(`/profile`);
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
                Brief Bio
              </Text>
              <Link href={`/profile/${id}/education/create`} className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
            <Box className="pb-[7px]">
              <Section className="bg-white" py="4" px="3">
                <Heading as="h6" size="4" weight="medium" align="left" mb="2">
                  Describe yourself
                </Heading>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputTextArea
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

export default Bio;
