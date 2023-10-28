"use client";
import { ParamsType, useDeleteContent, useGetContent } from "@/services/content";
import { ContentType } from "@/types/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  MRT_PaginationState,
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
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const {
    data: contents,
    isLoading,
    mutate,
  } = useGetContent<ParamsType, ContentType>({
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
    name: globalFilter || "",
  });
  // console.log(contents);
  const { trigger: deleteTrigger } = useDeleteContent();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      // {
      //   accessorKey: "description",
      //   header: "Description",
      //   enableEditing: false,
      //   Cell: ({ row }: any) => <div>{truncateText(row.original.description, 20)}</div>,
      // },
      {
        accessorKey: "type",
        header: "Type",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => (
          <p>{row?.original?.type?.charAt(0).toUpperCase() + row?.original?.type?.slice(1)}</p>
        ),
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
        size: 3,
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
      },
    ],
    []
  );

  //DELETE action
  const handleDelete = async () => {
    setOpen(false);
    await deleteTrigger({ id });
  };

  // const openDeleteConfirmModal = async (row: MRT_Row<any>) => {
  //   const { id } = row;
  //   if (window.confirm("Are you sure you want to delete this content?")) {
  //     await deleteTrigger({ id });
  //   }
  // };

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
        variant="contained"
        color="error"
        sx={{ background: "#DA291C", textTransform: "none" }}
      >
        <Link href={"/admin/contents/content/0"}>Create New Content</Link>
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
          <Typography sx={{ mt: 2 }}>Are you sure you want to delete this content?</Typography>
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
                onClick={handleDelete}
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

export default ContentTable;
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

// function truncateText(text: string, maxWords: number) {
//   const words = text?.split(" ");

//   if (words?.length > maxWords) {
//     const truncatedText = words?.slice(0, maxWords).join(" ");
//     return `${truncatedText}...`;
//   } else {
//     return text;
//   }
// }
