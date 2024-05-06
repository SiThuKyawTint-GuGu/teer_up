import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { PROFILE_TRIGGER } from "@/shared/enums";
import { UserProfileResponse } from "@/types/Profile";
import { cn } from "@/utils/cn";
import { Animate, Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";

import { Box, Flex, Text } from "@radix-ui/themes";
import { ChangeEvent } from "react";
import Image from "next/image";

const profileTrigger = {
  [PROFILE_TRIGGER.COVER]: "See cover picture",
  [PROFILE_TRIGGER.PROFILE]: "See profile picture",
};
const profileCreateTrigger = {
  [PROFILE_TRIGGER.COVER]: "Select cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Select profile picture",
};
const profileDeleteTrigger = {
  [PROFILE_TRIGGER.COVER]: "Delete cover picture",
  [PROFILE_TRIGGER.PROFILE]: "Delete profile picture",
};

const profileTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/select-profile.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/see-profile.svg",
};

const profileEditTriggerIcon = {
  [PROFILE_TRIGGER.COVER]: "/uploads/icons/photo-edit.svg",
  [PROFILE_TRIGGER.PROFILE]: "/uploads/icons/photo-edit.svg",
};

interface ProfilePhotoModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  viewImage: boolean;
  setViewImage: (val: boolean) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (val: boolean) => void;
  triggerType: PROFILE_TRIGGER;
  setTriggerType: (val: PROFILE_TRIGGER) => void;
  isPending: boolean;
  handleDeletePhoto: () => void;
  handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void;
  showEditDeleteProilPhoto: boolean;
  showEditDeleteCoverPhoto: boolean;
  CreateUpdateLabelForPhoto: string;
  children: React.ReactNode;
  userProfile: UserProfileResponse;
}

function ProfilePhotoModal({
  open,
  setOpen,
  viewImage,
  setViewImage,
  deleteModalOpen,
  setDeleteModalOpen,
  triggerType,
  setTriggerType,
  isPending,
  handleDeletePhoto,
  handleUploadImage,
  showEditDeleteProilPhoto,
  showEditDeleteCoverPhoto,
  CreateUpdateLabelForPhoto,
  children,
  userProfile: { data: userProfile },
}: ProfilePhotoModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        setOpen(val);
        setViewImage(false);
      }}
    >
      {children}
      <DialogContent
        className={cn(
          "bg-white top-[initial] bottom-0 px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr",
          viewImage && "top-0 rounded-none"
        )}
        handleOnClose={setViewImage}
        animate={Animate.SLIDE}
      >
        {!viewImage ? (
          <Box className="space-y-[20px]">
            {showEditDeleteProilPhoto ? (
              <Flex
                justify="start"
                align="center"
                className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                onClick={() => setViewImage(true)}
              >
                <Image
                  src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                  width={20}
                  height={20}
                  alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                />
                <Text className="text-black ml-2">{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
              </Flex>
            ) : (
              showEditDeleteCoverPhoto && (
                <Flex
                  justify="start"
                  align="center"
                  className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                  onClick={() => setViewImage(true)}
                >
                  <Image
                    src={profileTriggerIcon[triggerType as PROFILE_TRIGGER]}
                    width={20}
                    height={20}
                    alt={profileTrigger[triggerType as PROFILE_TRIGGER]}
                  />
                  <Text className="text-black ml-2">{profileTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                </Flex>
              )
            )}

            <Flex
              justify="start"
              align="center"
              position="relative"
              className={`pb-[16px]  gap-[10px]  ${
                (showEditDeleteProilPhoto || showEditDeleteCoverPhoto) && "border-b border-b-[#BDC7D5] mb-[16px]"
              }                 `}
            >
              <input
                type="file"
                onChange={handleUploadImage}
                className="absolute top-0 left-0 w-full h-full opacity-0 z-50"
              />
              <Image
                src={profileEditTriggerIcon[triggerType as PROFILE_TRIGGER]}
                width={20}
                height={20}
                alt={profileCreateTrigger[triggerType as PROFILE_TRIGGER]}
              />
              <Text className="text-black">{CreateUpdateLabelForPhoto}</Text>
            </Flex>
            {showEditDeleteProilPhoto ? (
              <Flex
                justify="start"
                align="center"
                className="pb-[16px] mb-[16px] border-b border-b-[#BDC7D5] gap-[10px]"
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              >
                <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
              </Flex>
            ) : (
              showEditDeleteCoverPhoto && (
                <Flex
                  justify="start"
                  align="center"
                  className="pb-[16px] mb-[16px] gap-[10px]"
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  <Icons.deleteCross className="w-7 h-7 text-[#373A36]" />
                  <Text className="text-black">{profileDeleteTrigger[triggerType as PROFILE_TRIGGER]}</Text>
                </Flex>
              )
            )}
          </Box>
        ) : (
          <Flex className="relative" justify="center" align="center">
            {triggerType === PROFILE_TRIGGER.COVER ? (
              /* eslint-disable @next/next/no-img-element */
              <img src={userProfile?.cover_url} alt="" />
            ) : (
              <img src={userProfile?.profile_url} alt="" />
            )}
          </Flex>
        )}
      </DialogContent>
      {deleteModalOpen && (
        <DialogContent isClose={false} className="border-none shadow-none h-fit top-[50%] translate-y-[-50%]">
          <div className="text-center space-y-[10px] bg-white p-4 rounded-lg">
            <Text className="text-[#373A36] text-[20px] font-[700]">
              {" "}
              Are you sure to delete your {triggerType?.toLocaleLowerCase()} picture?
            </Text>
            <Text className="text-[#373A36]">
              Your {triggerType?.toLocaleLowerCase()} picture will be displayed as default
              {triggerType?.toLocaleLowerCase()} after you deleted.
            </Text>
            <Flex justify="center" className="gap-3">
              <Button className="w-1/2 font-[600]" onClick={handleDeletePhoto} loading={isPending}>
                Delete
              </Button>

              <Button
                onClick={() => {
                  setDeleteModalOpen(false);
                }}
                className="w-1/2"
                variant="outline"
              >
                Cancel
              </Button>
            </Flex>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
export default ProfilePhotoModal;
