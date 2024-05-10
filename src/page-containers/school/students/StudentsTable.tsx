"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable, type MRT_TableOptions } from "material-react-table";
import { useMemo, useState } from "react";
import {staticStudentData as students} from "@/page-containers/school/students/staticData";

const StudentsTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 1
      },
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "created_at",
        header: "Registered Date",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => {
          const createdAt = row.original.created_at;
          if (createdAt && dayjs(createdAt).isValid()) {
            return dayjs(createdAt).format("MMM D, YYYY h:mm A");
          }
          return "";
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.phone_number,
          helperText: validationErrors?.phone_number,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phone_number: undefined,
            }),
        },
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => {
          const updatedAt = row.original.updated_at;
          if (updatedAt && dayjs(updatedAt).isValid()) {
            return dayjs(updatedAt).format("MMM D, YYYY h:mm A");
          }
          return "";
        },
      },
    ],
    [validationErrors]
  );

  //UPDATE action
  const handleSaveStudent: MRT_TableOptions<any>["onEditingRowSave"] = ({ values, table }) => {
    // const { id, name } = values;
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // const newValues = {
    //   name,
    //   id,
    // };
    // updateTrigger(newValues, {
    //   onSuccess: () => {
    //     // mutate();
    //   },
    // });
    table.setEditingRow(null);
  };

  //DELETE action
  const handleDelete = async () => {
    setOpen(false);
    // await deleteTrigger({ id });
    console.log("deleted")
  };

  const table = useMaterialReactTable({
    columns,
    data: (students as any) || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: row => row.id,
    // muiToolbarAlertBannerProps: isLoading
    //   ? {
    //     color: "error",
    //     children: "Error loading data",
    //   }
    //   : undefined,
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    positionActionsColumn: "last",
    state: {
      showSkeletons: false,
    },
    onEditingRowSave: handleSaveStudent,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setId(row.id);
              setOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <Box padding={2}>
      <Typography variant={"h4"} fontWeight={"bold"} sx={{
        marginBottom: 4,
      }}> Student List </Typography>
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this student ID <span className="text-red-700 font-semibold">[{id}]</span>?
          </Typography>
          <div className="flex justify-between mt-4">
            <div></div>
            <div>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  textTransform: "none",
                  marginRight: "10px",
                  color: "white",
                  background: "gray",
                  ":hover": {
                    color: "white",
                    background: "gray",
                  },
                }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error" sx={{ textTransform: "none" }} variant="contained">
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentsTable;

const validateRequired = (value: string) => !!value.length;

function validateUser(user: any) {
  return {
    name: !validateRequired(user.name) ? "Name is Required" : "",
  };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
