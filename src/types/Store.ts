export type VerifyModalState = {
  openVerifyModal: boolean;
  verifyModalOpenHandler: () => void;
  verifyModalCloseHandler: () => void;
};

export type VerifyEmailModalState = {
  openVerifyEmailModal: boolean;
  verifyEmailModalOpenHandler: () => void;
  verifyEmailModalCloseHandler: () => void;
};

export interface DrawerState {
  open: boolean;
  setOpen: (value: boolean) => void;
}
