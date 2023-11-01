import { VerifyEmailModalState, VerifyModalState } from "@/types/Store";
import { create } from "zustand";

export const useVerifyModal = create<VerifyModalState>(set => {
  return {
    openVerifyModal: false,
    verifyModalOpenHandler: () => set({ openVerifyModal: true }),
    verifyModalCloseHandler: () => set({ openVerifyModal: false }),
  };
});

export const useVerifyEmailModal = create<VerifyEmailModalState>(set => {
  return {
    openVerifyEmailModal: false,
    verifyEmailModalOpenHandler: () => set({ openVerifyEmailModal: true }),
    verifyEmailModalCloseHandler: () => set({ openVerifyEmailModal: false }),
  };
});
