"use client";
import { ParamsType, useDeleteBlog, useGetBlogs } from "@/services/blogPost";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const BlogTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { data: blogs, isLoading } = useGetBlogs<ParamsType, any>({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    name: globalFilter || "",
  });
  const { trigger: deleteTrigger } = useDeleteBlog();

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
      // {
      //   accessorKey: "content",
      //   header: "Content",
      //   enableEditing: false,
      // },
      {
        accessorKey: "link",
        header: "Link",
        enableEditing: false,
      },
      // {
      //   accessorKey: "is_public",
      //   header: "Public",
      //   enableEditing: false,
      // },
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
    data: (blogs?.data as any) || [],
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
    rowCount: blogs?.total,
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
          <Link href={`/admin/blogs/posts/${row.id}`}>
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
      <Button variant="contained" color="error" sx={{ textTransform: "none" }}>
        <Link href={"/admin/blogs/posts/0"}>Create New Blog</Link>
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default BlogTable;
