"use client";
import { ParamsType, useDeleteContent, useGetContent } from "@/services/content";
import { ContentType } from "@/types/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
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
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { data: contents, isLoading } = useGetContent<ParamsType, ContentType>({
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
    name: globalFilter || "",
  });
  console.log(contents);
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
      {
        accessorKey: "type",
        header: "Type",
        enableEditing: false,
      },
      // {
      //   accessorKey: "keywords",
      //   header: "Keywords",
      //   enableEditing: false,

      // },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
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
        pageIndex: 0,
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
      <Button
        variant="contained"
        color="error"
        sx={{ background: "#DA291C", textTransform: "none" }}
      >
        <Link href={"/admin/contents/content/0"}>Create New Content</Link>
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ContentTable;
