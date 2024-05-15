"use client";

import { useGetMajors } from "@/services/school";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Chip, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AllMajorResponse, Major } from "@/types/Majors";

export default function AllMajorsTable() {
  const [majors, setMajors] = useState<Major[]>();
  const { data: majorsData, isLoading, mutate } = useGetMajors<AllMajorResponse>();
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (majorsData) setMajors(majorsData?.data);
  }, [majorsData?.data]);

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
        header: "Major Name",
        enableEditing: false,
      },
      {
        accessorKey: "degree.name",
        header: "Degree Name",
        enableEditing: false,
        renderCell: ({ row }: { row: Major }) => {
          return <Chip label={row.degree.name} />;
        },
      },
      {
        accessorKey: "degree.school.name",
        header: "University Name",
        enableEditing: false,
        renderCell: ({ row }: { row: Major }) => {
          return <Chip label={row.degree.school.name} />;
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: (majors as any) || [],
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
    rowCount: majors?.length ?? 0,
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
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 75, 100, 500, 700, 1000],
      showFirstButton: false,
      showLastButton: false,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          {/* <Link href={`/admin/banners/${row.id}`}> */}
          <IconButton>
            <EditIcon />
          </IconButton>
          {/* </Link> */}
        </Tooltip>
        <Tooltip title="Details">
          {/*<Link href={`/admin/schools/${row.id}`}>*/}
          <IconButton>
            <InfoIcon />
          </IconButton>
          {/*</Link>*/}
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
      <Typography variant="h6" fontWeight="bold" m={2}>
        All Majors
      </Typography>
    ),
  });

  const handleDeleteSchool = async () => {
    setOpen(false);

    // await deleteTrigger({ id });
  };

  return (
    <>
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this major ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
              <LoadingButton
                // loading={deletingSchool}
                onClick={handleDeleteSchool}
                color="error"
                sx={{ textTransform: "none" }}
                variant="contained"
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

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
