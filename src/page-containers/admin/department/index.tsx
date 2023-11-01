"use client";
import { useCreateDepartment, useDeleteDepartment, useGetDepartment, useUpdateDepartment } from "@/services/department";
import { DepartmentResponse } from "@/types/Department";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable, type MRT_TableOptions } from "material-react-table";
import { useMemo, useState } from "react";

const Department: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { data: departments, isLoading, mutate } = useGetDepartment<DepartmentResponse>();

  const { trigger: createTrigger } = useCreateDepartment();
  const { trigger: updateTrigger } = useUpdateDepartment();
  const { trigger: deleteTrigger } = useDeleteDepartment();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
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
        header: "Created At",
        enableEditing: false,
        Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      },
      {
        accessorKey: "updated_at",
        header: "Upated At",
        enableEditing: false,
        Cell: ({ row }: any) => dayjs(row.original.updated_at).format("MMM D, YYYY h:mm A"),
      },
    ],
    [validationErrors]
  );

  //CREATE action
  const handleCreateDepartment: MRT_TableOptions<any>["onCreatingRowSave"] = async ({ values, table }) => {
    const { id, name } = values;
    const newValidationErrors = validatePreference(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const newValues = {
      name,
      values,
    };
    createTrigger(newValues, {
      onSuccess: () => {
        mutate();
      },
    });
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleUpdateDepartment: MRT_TableOptions<any>["onEditingRowSave"] = ({ values, table }) => {
    const { id, name } = values;
    const newValidationErrors = validatePreference(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    const newValues = {
      name,
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
  const handleDeleteDepartment = async () => {
    setOpen(false);
    await deleteTrigger({ id });
  };

  const table = useMaterialReactTable({
    columns,
    data: (departments?.data as any) || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableColumnFilters: false,
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
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDepartment,
    onEditingRowCancel: () => setValidationErrors({}),
    positionActionsColumn: "last",
    state: {
      showSkeletons: isLoading ?? false,
    },
    onEditingRowSave: handleUpdateDepartment,
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        color="error"
        sx={{ background: "#DA291C", textTransform: "none" }}
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Department
      </Button>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this department ID{" "}
            <span className="text-red-700 font-semibold">[{id}]</span>?
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
              <Button onClick={handleDeleteDepartment} color="error" sx={{ textTransform: "none" }} variant="contained">
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Department;

const validateRequired = (value: string) => !!value.length;

function validatePreference(pre: any) {
  return {
    name: !validateRequired(pre.name) ? "Name is Required" : "",
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
