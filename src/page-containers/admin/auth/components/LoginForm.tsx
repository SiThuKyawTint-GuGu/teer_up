import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";

import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";

const validationSchema = yup.object({
  email: yup.string().email().required("Email address is required!"),
  password: yup.string().required("Password is required!"),
});

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isMutating, trigger: loginTrigger, error: loginError } = useUserLogin();

  const loginHandler = async (data: { email: string; password: string }) => {
    await loginTrigger(data, {
      onSuccess: res => {
        const { token, data } = res.data;
        setUserInfo(token, data);
        router.push("/admin");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center w-[330px]">
        <h2 className="text-3xl mb-10 font-medium" style={{ color: "#da291c" }}>
          Sign In
        </h2>
        {error && <div className="text-primary">{error}</div>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginHandler)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      label="Email Address"
                      size="medium"
                      className="w-full"
                      variant="outlined"
                      autoComplete="false"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      type="password"
                      label="Password"
                      size="medium"
                      className="w-full"
                      variant="outlined"
                      autoComplete="false"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <LoadingButton
              sx={{
                width: "100%",
              }}
              type="submit"
              variant="contained"
              size="large"
              loading={isMutating}
            >
              Submit
            </LoadingButton>
            {/* <Button className="p-2 mt-[50px] rounded-md bg-red-700 w-full text-white" type="submit">
              Submit
            </Button> */}
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
