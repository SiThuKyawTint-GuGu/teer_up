"use client";
import { ParamsType, useGetMentorship } from "@/services/mentorship";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  MRT_PaginationState,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

const MentorshipTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { data: mentorships, isLoading } = useGetMentorship<ParamsType, any>({
    // status:'pending',
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
    search: globalFilter || "",
  });
  console.log("mentorships...", mentorships);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "mentor.name",
        header: "Mentor Name",
        enableEditing: false,
      },
      {
        accessorKey: "student.name",
        header: "Student Name",
        enableEditing: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "student_reply",
        header: "Student Reply",
        enableEditing: false,
      },
      {
        accessorKey: "mentor_reply",
        header: "Mentor Reply",
        enableEditing: false,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 3,
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
      },
      {
        accessorKey: "updated_at",
        header: "Upated At",
        enableEditing: false,
        size: 3,
        Cell: ({ value }: any) => dayjs(value).format("YYYY-MM-DD"),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: (mentorships?.data as any) || [],

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
    manualFiltering: true,
    manualPagination: true,
    rowCount: mentorships?.total,
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
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default MentorshipTable;
