import { VerifyModalState } from "@/types/Store";
import { create } from "zustand";

export const useVerifyModal = create<VerifyModalState>(set => {
  return {
    openVerifyModal: false,
    verifyModalOpenHandler: () => set({ openVerifyModal: true }),
    verifyModalCloseHandler: () => set({ openVerifyModal: false }),
  };
});
