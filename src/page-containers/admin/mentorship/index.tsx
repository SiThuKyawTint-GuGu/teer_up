"use client";
import { ParamsType, useGetMentorship } from "@/services/mentorship";
import dayjs from "dayjs";
import { MaterialReactTable, MRT_PaginationState, useMaterialReactTable } from "material-react-table";
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
  // console.log("mentorships...", mentorships);

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
        Cell: ({ row }: any) => (
          <p>{row?.original?.status?.charAt(0).toUpperCase() + row?.original?.status?.slice(1)}</p>
        ),
        size: 2,
      },
      // {
      //   accessorKey: "student_reply",
      //   header: "Student Reply",
      //   enableEditing: false,
      // },
      // {
      //   accessorKey: "mentor_reply",
      //   header: "Mentor Reply",
      //   enableEditing: false,
      // },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 3,
        Cell: ({ value }: any) => dayjs(value).format("MMM D, YYYY h:mm A"),
      },
      {
        accessorKey: "updated_at",
        header: "Upated At",
        enableEditing: false,
        size: 3,
        Cell: ({ value }: any) => dayjs(value).format("MMM D, YYYY h:mm A"),
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
        maxHeight: "calc(100vh - 200px)",
        minHeight: "480px",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    manualFiltering: true,
    manualPagination: true,
    rowCount: mentorships?.total,
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
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default MentorshipTable;
