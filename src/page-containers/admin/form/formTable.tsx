"use client";
import { useDeleteFormConfig, useGetFormConfig } from "@/services/formConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { MaterialReactTable, MRT_Row, useMaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useMemo } from "react";

const FormConfigTable: React.FC = () => {
  const { data: forms, isLoading } = useGetFormConfig<any>();
  const { trigger: deleteTrigger } = useDeleteFormConfig();

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
        enableEditing: false,
      },
    ],
    []
  );

  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<any>) => {
    const { id } = row;
    if (window.confirm("Are you sure you want to delete this form?")) {
      await deleteTrigger({ id });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: (forms?.data as any) || [],
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row: any) => row.id,
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <Link href={`/admin/form/${row.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
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
      >
        <Link href={"/admin/form/0"}>Create New Form</Link>
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default FormConfigTable;
