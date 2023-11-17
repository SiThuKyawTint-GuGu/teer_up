import { useVerifyEmailModal } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";

const VerifyEmailModal = () => {
  const { openVerifyEmailModal, verifyEmailModalCloseHandler } = useVerifyEmailModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      {openVerifyEmailModal && (
        <Modal onClose={verifyEmailModalCloseHandler}>
          <div className="bg-white w-[358px] rounded-[8px] overflow-hidden">
            <div className="text-center w-full py-[16px] text-[20px] font-[600]">Verfiy Email</div>
            <div className="bg-[#EEE] w-full px-[24px] py-[32px] flex flex-col flex-wrap gap-y-3">
              <Text className="text-center font-[400]">
                Are you sure to continue without verification? We will not be able to save your progress if you do not
                verify email.
              </Text>
              <Button
                size="lg"
                className="w-full"
                disabled={isPending}
                onClick={() => startTransition(() => router.push("/auth/otp"))}
              >
                Verify now
              </Button>
              <Link href="/home">
                <Text className="w-full text-center text-primary">Do it later</Text>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VerifyEmailModal;
