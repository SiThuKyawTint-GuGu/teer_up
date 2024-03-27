import { useOAuthLogin } from "@/services/user";
import { setLocalStorage } from "@/utils";
import { setUserInfo } from "@/utils/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
type Props = {
  forLogin?: boolean;
};
export default function GoogleLogin({ forLogin = true }: Props) {
  const { isMutating, trigger } = useOAuthLogin();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: codeResponse => {
      trigger(
        { accessToken: codeResponse.access_token },
        {
          onSuccess: res => {
            setUserInfo(res.data.token, res.data.data);
            startTransition(() => {
              if (forLogin) {
                router.push("/");
              } else {
                setLocalStorage("content", 0);
                router.push("/industry");
              }
              router.refresh();
            });
          },
        }
      );
    },
  });

  return (
    <button
      onClick={() => {
        loginWithGoogle();
      }}
      className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold"
    >
      <FcGoogle size={28} /> {isMutating || isPending ? "Loading..." : "Login with Google"}
    </button>
  );
}
