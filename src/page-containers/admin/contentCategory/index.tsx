"use client";
import { useDeleteContentCategory, useGetContentCategory } from "@/services/contentCategory";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const CategoryTable: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { data: contentCategories, isLoading, mutate } = useGetContentCategory<ContentCategoryResponse>();
  const { trigger: deleteTrigger } = useDeleteContentCategory();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "icon_url",
        header: "Icon",
        enableEditing: false,
        Cell: ({ row }: any) => {
          const imgurl = row?.original.icon_url;
          if (imgurl) {
            return <Image src={row?.original?.icon_url} alt="icon" width={40} height={40} />;
          }
          return "";
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 3,
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
        size: 3,
        Cell: ({ row }: any) => {
          const updatedAt = row.original.updated_at;
          if (updatedAt && dayjs(updatedAt).isValid()) {
            return dayjs(updatedAt).format("MMM D, YYYY h:mm A");
          }
          return "";
        },
      },
    ],
    []
  );
  //DELETE action
  const handleDelete = async () => {
    setOpen(false);
    await deleteTrigger({ id });
  };

  const table = useMaterialReactTable({
    columns,
    data: (contentCategories?.data as any) || [],
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
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyHeader: true,
    enableStickyFooter: true,
    positionActionsColumn: "last",
    state: {
      showSkeletons: isLoading ?? false,
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="Edit">
          <Link href={`/admin/contents/category/${row.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
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
      <Button variant="contained" color="error" sx={{ background: "#DA291C", textTransform: "none" }}>
        <Link href={"/admin/contents/category/0"}>Create New Category</Link>
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
            Are you sure you want to delete this content category ID{" "}
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

export default CategoryTable;

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
