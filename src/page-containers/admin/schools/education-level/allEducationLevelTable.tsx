"use client";

import { useDeleteEducationLevel, useGetEducationLevels, useUpdateEducationLevel } from "@/services/school";
import { AllEduLevelResponse, EduLevel } from "@/types/EducationLevel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ColumnDef, MRT_TableOptions, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import CreateEducationLevelModal from "./CreateEducationLevelModal";

export default function AllEducationLevelTable() {
  const [eduLevels, setEduLevels] = useState<EduLevel[]>();
  const { data: eduLevelsData, isLoading, mutate } = useGetEducationLevels<AllEduLevelResponse>();
  const { trigger: updateEduLevel } = useUpdateEducationLevel();
  const { trigger: deleteTrigger, isMutating: deletingEduLevel } = useDeleteEducationLevel();
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (eduLevelsData) setEduLevels(eduLevelsData?.data);
  }, [eduLevelsData?.data]);

  const columns = useMemo<MRT_ColumnDef<EduLevel>[]>(
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
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
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
        Cell: ({ row }: any) => {
          const updatedAt = row.original.updated_at;
          if (updatedAt && dayjs(updatedAt).isValid()) {
            return dayjs(updatedAt).format("MMM D, YYYY h:mm A");
          }
          return "";
        },
      },
    ],
    [validationErrors]
  );

  // update action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({ values, table }) => {
    const errors = validateEduLevel(values as EduLevel);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const { id, name } = values;

    await updateEduLevel({ id, name });
    await mutate();
    table.setEditingRow(null);
  };

  const table = useMaterialReactTable({
    columns: columns as any,
    data: (eduLevels as any) || [],
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
    rowCount: eduLevels?.length ?? 0,
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSave,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          {/* <Link href={`/admin/banners/${row.id}`}> */}
          <IconButton onClick={() => table.setEditingRow(row)}>
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
      <>
        <CreateEducationLevelModal />
      </>
    ),
  });

  const handleDeleteSchool = async () => {
    setOpen(false);

    await deleteTrigger({ id });
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
            Are you sure you want to delete this education level ID{" "}
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
              <LoadingButton
                loading={deletingEduLevel}
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

function validateEduLevel(values: EduLevel) {
  const errors: Record<string, string | undefined> = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
}
