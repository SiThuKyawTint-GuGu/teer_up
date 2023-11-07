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
import { MaterialReactTable, MRT_PaginationState, useMaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ContentTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { data: contents, isLoading } = useGetContent<ParamsType, ContentType>({
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
    search: globalFilter || "",
  });
  // console.log(contents);
  const [contentData, setContentData] = useState<any>();
  const { trigger: deleteTrigger } = useDeleteContent();

  useEffect(() => {
    setContentData(contents?.data);
  }, [contents?.data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 0.5,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "type",
        header: "Type",
        enableEditing: false,
        size: 0.5,
        Cell: ({ row }: any) => <p>{row?.original?.type?.charAt(0).toUpperCase() + row?.original?.type?.slice(1)}</p>,
      },
      {
        accessorKey: "likes",
        header: "Likes",
        enableEditing: false,
        size: 0.5,
      },
      {
        accessorKey: "watched_count",
        header: "Watched",
        enableEditing: false,
        size: 0.5,
      },
      {
        accessorKey: "saves",
        header: "Saves",
        enableEditing: false,
        size: 0.5,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 1,
        Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      },
    ],
    []
  );

  //DELETE action
  const handleDeleteConfirm = async () => {
    setOpen(false);
    const data = contentData.filter((content: any) => content.id !== id);
    setContentData(data);
    await deleteTrigger({ id });
  };

  const table = useMaterialReactTable({
    columns,
    data: (contentData as any) || [],
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
    positionActionsColumn: "last",
    // manualFiltering: true,
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
    enableStickyHeader: true,
    enableStickyFooter: true,
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
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this content ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
              <Button onClick={handleDeleteConfirm} color="error" sx={{ textTransform: "none" }} variant="contained">
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
