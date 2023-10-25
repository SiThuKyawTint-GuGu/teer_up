"use client";
import {
  useCreateIndustry,
  useDeleteIndustry,
  useGetIndustry,
  useUpdateIndustry,
} from "@/services/industry";
import { IndustryResponse } from "@/types/Industry";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_TableOptions,
} from "material-react-table";
import { useMemo, useState } from "react";

const Industry: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { data: industries, isLoading, mutate } = useGetIndustry<IndustryResponse>();

  const { trigger: createTrigger } = useCreateIndustry();
  const { trigger: updateTrigger } = useUpdateIndustry();
  const { trigger: deleteTrigger } = useDeleteIndustry();

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
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
      },
      {
        accessorKey: "updated_at",
        header: "Upated At",
        enableEditing: false,
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
      },
    ],
    [validationErrors]
  );

  //CREATE action
  const handleCreateIndustry: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
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
  const handleUpdateIndustry: MRT_TableOptions<any>["onEditingRowSave"] = ({ values, table }) => {
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
  const handleDeleteIndustry = async () => {
    setOpen(false);
    await deleteTrigger({ id });
  };

  const table = useMaterialReactTable({
    columns,
    data: (industries?.data as any) || [],
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
    onCreatingRowSave: handleCreateIndustry,
    onEditingRowCancel: () => setValidationErrors({}),
    positionActionsColumn: "last",
    state: {
      showSkeletons: isLoading ?? false,
    },
    onEditingRowSave: handleUpdateIndustry,
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
        Create New Industry
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
          <Typography sx={{ mt: 2 }}>Are you sure you want to delete this industry?</Typography>
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
              <Button
                onClick={handleDeleteIndustry}
                color="error"
                sx={{ textTransform: "none" }}
                variant="contained"
              >
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Industry;

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
