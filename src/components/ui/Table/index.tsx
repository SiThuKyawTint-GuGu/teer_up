"use client";
import { ParamsType, useDeleteUser, useGetUsers, useUpdateUser } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import { UserResponse } from "@/types/User";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  type MRT_TableOptions,
} from "material-react-table";
import { useMemo, useState } from "react";
import { type User } from "./makeData";

const AdminTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const {
    data: userData,
    mutate,
    isLoading,
  } = useGetUsers<ParamsType, UserResponse>({
    role: USER_ROLE.ADMIN,
  });
  const { trigger: updateTrigger } = useUpdateUser();

  const { trigger: deleteTrigger } = useDeleteUser();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "First Name",
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
        accessorKey: "email",
        header: "Email",
        enableEditing: false,
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        enableEditing: false,
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = ({ values, table }) => {
    const { id, name, role } = values;
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const newValues = {
      name,
      role,
      id,
    };
    updateTrigger(newValues, {
      onSuccess: () => {
        mutate();
      },
    });
    table.setEditingRow(null);
  };

  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<any>) => {
    const { id } = row;
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteTrigger(
        { id },
        {
          onSuccess: () => {
            mutate();
          },
        }
      );
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: (userData?.data as any) || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: row => row.id,
    muiToolbarAlertBannerProps: isLoading
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    positionActionsColumn: "last",
    state: {
      showSkeletons: isLoading ?? false,
    },
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default AdminTable;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: User) {
  return {
    name: !validateRequired(user.name) ? "First Name is Required" : "",
  };
}
