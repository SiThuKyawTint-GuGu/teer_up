"use client";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../ui/Button";
import { DialogTrigger } from "../ui/Dialog";
import { Icons } from "../ui/Images";
import { InputText, InputTextArea } from "../ui/Inputs";
import Modal from "../ui/Modal";
import { Text } from "../ui/Typo/Text";
type Props = {
  data: ContentData;
  mutate: any;
};
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required!"),
  name: yup.string().required("Name is required!"),
  position: yup.string().required("Position is required!"),
  reason: yup.string().required("Reason is required!"),
});
const LikeCmtBar: React.FC<Props> = ({ data, mutate }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const saveContent = async () => {
    await contentSave(
      {
        id: data.id,
      },
      {
        onSuccess: () => mutate(),
      }
    );
  };
  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => mutate(),
      }
    );
  };
  const onSubmit = async (data: any) => {};
  return (
    <div className="bg-white flex py-5 items-center">
      {data.type === "event" && (
        <Button size="sm" className="w-[166px]" onClick={() => setOpenModal(true)}>
          Join now
        </Button>
      )}
      {data.type === "opportunity" && (
        <Button size="sm" className="w-[166px]">
          Apply now
        </Button>
      )}

      <div className="flex justify-between p-3 w-full flex-1">
        <div className="flex items-center flex-wrap gap-x-[5px]" onClick={likePost}>
          {data.is_liked ? (
            <Icons.likefill className="w-[20px] h-[20px] text-primary" />
          ) : (
            <Icons.like className="w-[20px] h-[20px]" />
          )}
          <div className="text-[14px]">{data.likes}</div>
        </div>
        <DialogTrigger>
          <div className="flex items-center flex-wrap  gap-x-[5px]">
            <Icons.comment className="w-[20px] h-[20px]" />
            <div>{data.comments}</div>
          </div>
        </DialogTrigger>
        <div className="flex items-center flex-wrap  gap-x-[5px]" onClick={saveContent}>
          {data.is_saved ? (
            <Icons.savedFill className="w-[20px] h-[20px] text-yellow-400" />
          ) : (
            <Icons.saved className="w-[20px] h-[20px]" />
          )}
          <div>{data.saves}</div>
        </div>
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="w-[400px] p-5">
            <Text as="div" className="text-[28px] font-700">
              Join Event
            </Text>
            <Form {...form}>
              <form
                className="mx-auto flex flex-col h-full justify-center flex-wrap gap-y-[30px] w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          className="bg-white shadow-sm placeholder:text-[16px]"
                          {...field}
                          placeholder="Enter your name"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          className="bg-white shadow-sm placeholder:text-[16px]"
                          {...field}
                          placeholder="Enter your email address"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputText
                          type="text"
                          className="bg-white shadow-sm placeholder:text-[16px]"
                          {...field}
                          placeholder="Enter your position"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputTextArea
                          type="text"
                          className="bg-white shadow-sm placeholder:text-[16px]"
                          {...field}
                          placeholder="Explain the reason why you want to join this event "
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LikeCmtBar;
