"use client";
import { ParamsType, useCreateUser, useDeleteUser, useGetUsers, useUpdateUser } from "@/services/user";
import { USER_ROLE } from "@/shared/enums";
import { UserResponse } from "@/types/User";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Alert, Box, Button, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  useMaterialReactTable,
  type MRT_TableOptions,
} from "material-react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type User } from "./makeData";

const UserTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const {
    data: userData,
    mutate,
    isLoading,
  } = useGetUsers<ParamsType, UserResponse>({
    role: (columnFilters.find(filter => filter.id === "role")?.value as USER_ROLE | undefined) || [
      USER_ROLE.STUDENT,
      USER_ROLE.MENTOR,
    ],
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    name: globalFilter || "",
  });
  const { trigger: createTrigger, error: createError } = useCreateUser();
  const { trigger: updateTrigger, error: updateError } = useUpdateUser();
  const { trigger: deleteTrigger } = useDeleteUser();

  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 0.5,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 0.5,
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        enableEditing: true,
        size: 1,
        muiEditTextFieldProps: {
          type: "email",
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
        accessorFn: (row: any) => {
          if (row.role) {
            return row.role === "mentor" ? "Mentor" : "Student";
          }
          return "";
        },
        id: "role",
        header: "Role",
        enableEditing: true,
        size: 0.5,
        editVariant: "select",
        editSelectOptions: ["Student", "Mentor"],
        muiEditTextFieldProps: {
          select: true,
          type: "role",
          required: true,
          error: !!validationErrors?.role,
          helperText: validationErrors?.role,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              // role: "undefined",
            }),
        },
      },
      {
        accessorKey: "last_login",
        header: "Last Login",
        enableEditing: false,
        size: 1,
        Cell: ({ row }: any) => {
          const lastLogin = row.original.last_login;
          if (lastLogin && dayjs(lastLogin).isValid()) {
            return dayjs(lastLogin).format("MMM D, YYYY h:mm A");
          }
          return "-";
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 1,
        Cell: ({ row }: any) => {
          const createdAt = row.original.created_at;
          if (createdAt && dayjs(createdAt).isValid()) {
            return dayjs(createdAt).format("MMM D, YYYY h:mm A");
          }
          return "";
        },
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 1,
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

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({ values, table }) => {
    const { name, email, role } = values;
    const newRole = role === "Mentor" ? "mentor" : "student";
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const newValues: any = {
      name,
      email,
      role: newRole,
    };
    createTrigger(newValues, {
      onSuccess: () => {
        mutate();
      },
    });
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = ({ values, table }) => {
    const { id, name, role } = values;
    const newRole = role === "Mentor" ? "mentor" : "student";
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const newValues = {
      name,
      role: newRole,
      id,
    };
    updateTrigger(newValues, {
      onSuccess: () => {
        mutate();
      },
    });
    table.setEditingRow(null); //exit editing mode
  };

  const handleDelete = async () => {
    setOpen(false);
    await deleteTrigger(
      { id },
      {
        onSuccess: () => {
          mutate();
        },
      }
    );
  };

  // console.log("globalFilter => ", globalFilter);

  const table = useMaterialReactTable({
    columns,
    data: (userData?.data as any) || [],
    // enableColumnPinning: true,
    // enableRowActions: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    enableColumnFilters: true,
    getRowId: row => row.id,
    muiToolbarAlertBannerProps: isLoading
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    positionActionsColumn: "last",
    manualFiltering: true,
    manualPagination: true,
    rowCount: userData?.total,
    initialState: {
      // columnPinning: { left: ["id"], right: [] },
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    state: {
      showSkeletons: isLoading ?? false,
      pagination,
      columnFilters,
      isLoading,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Detail">
          <Link href={`/admin/users/user-scores/${row.id}`}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            // onClick={() => openDeleteConfirmModal(row)}
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true);
        }}
        variant="contained"
        color="error"
        sx={{ background: "#DA291C", textTransform: "none" }}
      >
        Create New User
      </Button>
    ),
  });

  return (
    <>
      {createError && (
        <Alert sx={{ marginBottom: "20px", width: "60%", marginLeft: "12px" }} severity="error">
          {createError.response.data.message}
        </Alert>
      )}
      {updateError && (
        <Alert sx={{ marginBottom: "20px", width: "60%", marginLeft: "12px" }} severity="error">
          {updateError.response.data.message}
        </Alert>
      )}
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this user ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
    </>
  );
};

export default UserTable;

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
    role: !validateRequired(user.role) ? "Role is Required" : "",
    email: !validateEmail(user.email || "") ? "Email is required" : "",
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
