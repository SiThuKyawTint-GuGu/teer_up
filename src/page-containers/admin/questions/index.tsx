"use client";
import { useDeleteQuestion, useGetQuestion } from "@/services/question";
import { QuestionResponse } from "@/types/Question";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const Questions: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { data: questions, isLoading } = useGetQuestion<QuestionResponse>();
  // console.log(questions);
  const { trigger: deleteTrigger } = useDeleteQuestion();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: false,
      },
      {
        accessorKey: "dimension.name",
        header: "Dimension",
        enableEditing: false,
      },
      {
        accessorKey: "type",
        header: "Type",
        enableEditing: false,
        size: 2,
        Cell: ({ row }: any) => <p>{row?.original?.type?.charAt(0).toUpperCase() + row?.original?.type?.slice(1)}</p>,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 4,
        Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 4,
        Cell: ({ row }: any) => dayjs(row.original.updated_at).format("MMM D, YYYY h:mm A"),
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
    data: (questions?.data as any) || [],
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
    enableStickyFooter: true,
    enableStickyHeader: true,
    state: {
      showSkeletons: isLoading ?? false,
    },

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
        <Tooltip title="Edit">
          <Link href={`/admin/setting/questions/${row.id}`}>
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
      <Button variant="contained" color="error" sx={{ background: "#DA291C", textTransform: "none" }}>
        <Link href={"/admin/setting/questions/0"}>Create New Question</Link>
      </Button>
    ),
  });

  return (
    <Box sx={{ width: "100%" }}>
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this question ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
    </Box>
  );
};

export default Questions;

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
