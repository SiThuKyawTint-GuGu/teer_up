import { LogosLinkedinIcon, SkillIconsInstagram } from "@/components/ui/Images/Icons";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (
    <Link href="/auth/social">
      <button className="w-full border-[1px] border-black rounded-[30px] justify-center flex mx-auto py-1 items-center gap-2 font-bold">
        <FcGoogle size={28} />
        <LogosLinkedinIcon />
        <SkillIconsInstagram />
      </button>
    </Link>
  );
}
