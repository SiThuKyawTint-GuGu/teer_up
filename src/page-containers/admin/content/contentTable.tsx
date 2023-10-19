"use client";
import { Button } from "@/components/ui/Button";
import { ParamsType, useGetContent } from "@/services/content";
import {
  useCreateContentCategory,
  useDeleteContentCategory,
  useUpdateContentCategory,
} from "@/services/contentCategory";
import { ContentType } from "@/types/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_TableOptions,
} from "material-react-table";
import { useMemo, useState } from "react";

const ContentTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const { data: contents, isLoading, mutate } = useGetContent<ParamsType, ContentType>();
  const { trigger: createTrigger } = useCreateContentCategory();
  const { trigger: updateTrigger } = useUpdateContentCategory();
  const { trigger: deleteTrigger } = useDeleteContentCategory();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableEditing: false,
      },
      {
        accessorKey: "image_url",
        header: "Image URL",
        enableEditing: false,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
    ],
    [validationErrors]
  );

  //CREATE action
  const handleCreateCategory: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const { id, name } = values;
    const newValidationErrors = validateUser(values);
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
  const handleSaveCategory: MRT_TableOptions<any>["onEditingRowSave"] = ({ values, table }) => {
    const { id, name } = values;
    const newValidationErrors = validateUser(values);
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

  const table = useMaterialReactTable({
    columns,
    data: (contents?.data as any) || [],
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
    positionActionsColumn: "last",
    state: {
      showSkeletons: isLoading ?? false,
    },
    onEditingRowSave: handleSaveCategory,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
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
      >
        Create New Category
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ContentTable;

const validateRequired = (value: string) => !!value.length;

function validateUser(user: any) {
  return {
    name: !validateRequired(user.name) ? "First Name is Required" : "",
  };
}
