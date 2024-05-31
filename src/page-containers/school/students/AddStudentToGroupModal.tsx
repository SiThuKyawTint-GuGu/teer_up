"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import {
  useAddToStudentGroup,
  useGetStudentGroupById,
  useRemoveStudentFromGroup,
} from "@/services/school/studentGroup";
import { StudentGroupDataResponse } from "@/types/school/StudentGroup";

const studentGroupSchema = yup.object().shape({
  group_id: yup.number().required("Student Group is required"),
  student_emails: yup
    .string()
    .test("emails", "Invalid email(s)", value => {
      if (!value) return false;
      const emails = value.split(" ").filter(email => email.trim() !== "");
      return emails.every(email => yup.string().email().isValidSync(email));
    })
    .test("duplicate", "Duplicate email(s) found", value => {
      if (!value) return false;
      const emails = value.split(" ").filter(email => email.trim() !== "");
      const uniqueEmails = new Set(emails);
      return uniqueEmails.size === emails.length;
    })
    .required("Student emails are required"),
});

function AddStudentToGroupModal({ id, type = "addstudent" }: { id: string; type: "addstudent" | "removestudent" }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(studentGroupSchema),
    defaultValues: {
      group_id: parseInt(id),
    },
  });
  const { trigger: addToStudentGroup, isMutating } = useAddToStudentGroup();
  const { trigger: removeStudentFromGroup, isMutating: removingStudents } = useRemoveStudentFromGroup();

  const { mutate } = useGetStudentGroupById<
    {
      id: string;
    },
    StudentGroupDataResponse
  >({ id });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log("data", data);
    const emails = data.student_emails.split(" ").filter((email: string) => email.trim() !== "");
    const formattedData = {
      group_id: data.group_id,
      student_emails: emails,
    };
    console.log(formattedData);
    if (type === "removestudent") {
      removeStudentFromGroup(formattedData, {
        onSuccess: () => {
          toast.success("Successfully removed");
          reset();
          mutate();
          handleClose();
        },
        onError: err => {
          console.log(err);
          toast.error(err.response.data.message);
        },
      });
    } else {
      addToStudentGroup(formattedData, {
        onSuccess: (res: any) => {
          if (res?.data?.data?.invalid?.length) {
            setError("student_emails", {
              type: "manual",
              message: `Invalid emails: ${res?.data?.data?.invalid.join(", ")}`,
            });
          } else {
            reset();
            mutate();
            handleClose();
          }
        },
        onError: err => {
          console.log(err);
          toast.error("Error adding students");
        },
      });
    }
  };

  return (
    <div>
      <Button size={"small"} variant="contained" onClick={handleClickOpen}>
        {type === "addstudent" ? "Add Students" : "Remove Students"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width
        fullWidth // Ensure full width
      >
        <DialogTitle>Add Student Group</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Student Emails"
              placeholder="Enter emails separated by spaces"
              {...register("student_emails")}
              error={!!errors.student_emails}
              helperText={
                errors.student_emails?.message || "Emails are separated with a SPACE and no SPACE at the end!"
              }
              fullWidth
              margin="normal"
            />

            <DialogActions sx={{ marginTop: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton loading={isSubmitting || isMutating} type="submit" variant="contained" color="primary">
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddStudentToGroupModal;
