"use client";
import { Button } from "@/components/ui/Button";
import { ParamsType, useDeleteContent, useGetContent } from "@/services/content";
import { ContentType } from "@/types/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const ContentTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { data: contents, isLoading } = useGetContent<ParamsType, ContentType>({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    name: globalFilter || "",
  });
  const { trigger: deleteTrigger } = useDeleteContent();

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
      // {
      //   accessorKey: "image_url",
      //   header: "Image URL",
      //   enableEditing: false,
      // },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
    ],
    []
  );

  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<any>) => {
    const { id } = row;
    if (window.confirm("Are you sure you want to delete this content?")) {
      await deleteTrigger({ id });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: (contents?.data as any) || [],
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
    manualFiltering: true,
    manualPagination: true,
    rowCount: contents?.total,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 1,
      },
    },
    state: {
      showSkeletons: isLoading ?? false,
      pagination,
      isLoading,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <Link href={`/admin/contents/content/${row.id}`}>
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
      <Button className="my-5 mr-2">
        <Link href={"/admin/contents/content/0"}>Create New Content</Link>
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ContentTable;
