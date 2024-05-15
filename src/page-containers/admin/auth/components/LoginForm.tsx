import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";

import { useUserLogin } from "@/services/user";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, TextField } from "@mui/material";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup.string().email().required("Email address is required!"),
  password: yup.string().required("Password is required!"),
});

const LoginForm = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isMutating, trigger: loginTrigger, error: loginError } = useUserLogin();


  const {executeRecaptcha} = useGoogleReCaptcha()
  const loginHandler = async (data: { email: string; password: string; token?: string }) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }

    try {
      const gReCaptchaToken = await executeRecaptcha("login");
      if (!gReCaptchaToken) {
        console.log("Failed to get reCAPTCHA token");
        return;
      }

      const updatedData = { ...data, token: gReCaptchaToken };

      await loginTrigger(updatedData, {
        onSuccess: (res) => {
          const { token, data: userInfo } = res.data;
          setUserInfo(token, userInfo);
          router.push("/admin/contents/content");
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <>
      <div className="flex flex-col h-screen justify-center w-[330px]">
        <h2 className="text-3xl mb-10 font-medium" style={{ color: "#da291c" }}>
          Sign In
        </h2>
        {loginError && (
          <Alert sx={{ marginBottom: "20px" }} severity="error">
            {loginError.response.data.message}
          </Alert>
        )}
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
