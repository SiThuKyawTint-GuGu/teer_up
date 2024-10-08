"use client";

import {
  useDeleteStudentGroup,
  useGetStudentGroupById,
  useRemoveStudentFromGroup,
  useUpdateStudentGroup,
} from "@/services/school/studentGroup";
import { Student, StudentGroup, StudentGroupDataResponse } from "@/types/school/StudentGroup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

import AddStudentToGroupModal from "@/page-containers/school/students/AddStudentToGroupModal";

interface props {
  id: string;
}

export default function StudentTable({ id: studentGroupId }: props) {
  const [students, setStudents] = useState<Student[]>();
  const {
    data: studentGroupsData,
    isLoading,
    mutate,
  } = useGetStudentGroupById<
    {
      id: string;
    },
    StudentGroupDataResponse
  >({ id: studentGroupId });
  const { trigger: updateStudentGroup } = useUpdateStudentGroup();
  const { trigger: deleteTrigger, isMutating: deletingStudentGroup } = useDeleteStudentGroup();
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const { trigger: removeStudentFromGroup, isMutating: removingStudents } = useRemoveStudentFromGroup();

  useEffect(() => {
    if (studentGroupsData) setStudents(studentGroupsData?.data.students);
  }, [studentGroupsData?.data]);

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
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
        accessorKey: "email",
        header: "Email",
      },
    ],
    [validationErrors]
  );

  // update action
  const handleSave: MRT_TableOptions<any>["onEditingRowSave"] = async ({ values, table }) => {
    const errors = validate(values as StudentGroup);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const { id, name } = values;

    await updateStudentGroup({ id, name });
    await mutate();
    table.setEditingRow(null);
  };

  const removeSelectedStudents = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const formattedData = {
      group_id: parseInt(studentGroupId),
      student_emails: selectedRows.map((row: any) => row.original.email),
    };

    removeStudentFromGroup(formattedData, {
      onSuccess: () => {
        mutate();
        setRowSelection({});
      },
    });
  };

  const table = useMaterialReactTable({
    columns: columns as any,
    data: (students as any) || [],
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
        height: "calc(100vh - 320px)",
        overflow: "auto",
      },
    },
    positionActionsColumn: "last",
    // manualFiltering: true,
    manualPagination: true,
    rowCount: students?.length ?? 0,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      showSkeletons: isLoading ?? false,
      pagination,
      isLoading,
      rowSelection,
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Box display="flex" columnGap={2}>
        <AddStudentToGroupModal id={studentGroupId} type={"addstudent"} />
        {rowSelection && Object.keys(rowSelection).some(key => rowSelection[key]) && (
          <LoadingButton
            onClick={removeSelectedStudents}
            loading={removingStudents}
            disabled={!Object.keys(rowSelection).some(key => rowSelection[key])}
            variant="contained"
            size="small"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Remove Selected
          </LoadingButton>
        )}
      </Box>
    ),
  });

  const handleDeleteSchool = async () => {
    setOpen(false);

    await deleteTrigger({ id });
  };

  return (
    <Container sx={{ mb: 10, maxWidth: "lg" }}>
      <Typography
        variant={"h5"}
        fontWeight={"bold"}
        sx={{
          marginBottom: 4,
        }}
      >
        {" "}
        Student List{" "}
      </Typography>
      <MaterialReactTable table={table} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography color={"error"} variant="h6" component="h2">
            Delete Confirm
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this student ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
                loading={deletingStudentGroup}
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
    </Container>
  );
}

function validate(values: StudentGroup) {
  const errors: Record<string, string | undefined> = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
