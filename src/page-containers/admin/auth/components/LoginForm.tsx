import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { InputText } from "@/components/ui/Inputs";
import { postMethod } from "@/hooks/postMethod";

import { AuthResponse } from "@/types/User";
import { setUserInfo } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup.string().email().required("Email address is required!"),
  password: yup.string().required("Password is required!"),
});

interface Login {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const registerMutation = useLogin();

  const loginHandler = async (data: Login) => {
    postMethod<AuthResponse>("/user/login", data)
      .then(response => {
        setError(null);
        setUserInfo(response.token, response.data);
        router.push("/");
        console.log(response.token);
      })
      .catch(error => setError(error.message));
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center">
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <InputText placeholder="Email Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputText type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="p-2 mt-[50px] rounded-md bg-red-700 w-full text-white" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
