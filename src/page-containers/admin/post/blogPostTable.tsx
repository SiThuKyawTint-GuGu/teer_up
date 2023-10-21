"use client";
import { Button } from "@/components/ui/Button";
import { useDeleteBlog, useGetBlogs } from "@/services/blogPost";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable, MRT_Row, useMaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useMemo } from "react";

const BlogTable: React.FC = () => {
  const { data: blogs, isLoading } = useGetBlogs<any>();
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
    state: {
      showSkeletons: isLoading ?? false,
    },
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
      <Button className="my-5 mr-2">
        <Link href={"/admin/blogs/posts/0"}>Create New Blog</Link>
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default BlogTable;
