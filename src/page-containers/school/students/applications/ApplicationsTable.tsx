"use client";
import { Box, Typography } from "@mui/material";

import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import {staticStudentApplicationsData as  studentApplications} from "@/page-containers/school/students/applications/applicationsData";

const ApplicationsTable: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 1
      },
      {
        accessorKey: "job_name",
        header: "Name",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
      },
      {
        accessorKey: "created_at",
        header: "Applied Date",
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
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.phone_number,
          helperText: validationErrors?.phone_number,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phone_number: undefined,
            }),
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
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: (studentApplications as any) || [],
    enableEditing: true,
    getRowId: row => row.id,
    // muiToolbarAlertBannerProps: isLoading
    //   ? {
    //     color: "error",
    //     children: "Error loading data",
    //   }
    //   : undefined,
    muiTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    positionActionsColumn: "last",
    state: {
      showSkeletons: false,
    },
  });

  return (
    <Box padding={2}>
      <Typography variant={"h5"} fontWeight={"bold"} sx={{
        marginBottom: 4,
      }}>
        Student Name: John Doe
      </Typography>
      <Typography variant={"h5"} fontWeight={"bold"} sx={{
        marginBottom: 4,
      }}> Job Applications </Typography>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default ApplicationsTable;