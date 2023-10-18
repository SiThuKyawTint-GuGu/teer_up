import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useDeleteUser, useGetUser } from "@/services/user";
import { ROLES } from "@/shared/enums";
import { UserResponse } from "@/types/User";
import dayjs from "dayjs";
import { useState } from "react";
import { Column } from "react-table";
import UserUpdateForm from "../components/UserUpdateForm";

export const UserColumns: Column[] = [
  {
    Header: "User name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Verified",
    accessor: "verified",
    Cell: ({ value }) => <div>{value === true ? "Yes" : "No"}</div>,
  },
  {
    Header: "Updated Date",
    accessor: "updated_at",
    Cell: ({ value }) => <div>{dayjs(value).format("DD-MM-YYYY")}</div>,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => {
      const { id, role } = row.original as any;
      const [open, setOpen] = useState<boolean>(false);
      const [dialogType, setDialogType] = useState<"UPDATE" | "DELETE">();
      const { mutate } = useGetUser<ParamsType, UserResponse>({
        role,
      });
      const { trigger } = useDeleteUser(id);

      const handleDeleteUser = async () => {
        await trigger();
        await mutate();
        setOpen(!open);
      };

      return (
        <>
          <Dialog open={open} onOpenChange={val => setOpen(val)}>
            <div className="flex justify-start items-center gap-3">
              <DialogTrigger
                onClick={() => {
                  setOpen(!open);
                  setDialogType("UPDATE");
                }}
              >
                <div>
                  <Icons.edit className="w-[20px] h-[20px]" />
                </div>
              </DialogTrigger>
              <DialogTrigger
                onClick={() => {
                  setOpen(!open);
                  setDialogType("DELETE");
                }}
              >
                <div>
                  <Icons.delete className="w-[20px] h-[20px]" />
                </div>
              </DialogTrigger>
            </div>
            <DialogContent className="bg-white">
              {dialogType === "UPDATE" ? (
                <UserUpdateForm
                  row={row.original}
                  userId={id}
                  setOpen={setOpen}
                  role={role as ROLES}
                />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Text className="text-[24px]">Are you sure want to delete user?</Text>
                  <div className="flex justify-center items-center gap-4">
                    <DialogClose>
                      <Button className="p-2 mt-[50px] rounded-md w-full text-white" type="submit">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleDeleteUser}
                      className="p-2 mt-[50px] rounded-md w-full text-white"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
