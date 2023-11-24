"use client";
import { ParamsType } from "@/services/mentorship";
import { useGetNotifications } from "@/services/notification";
import { useDrawerStore } from "@/store/authStore";
import dayjs from "dayjs";
import { MaterialReactTable, MRT_PaginationState, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";

const NotificationTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const params: ParamsType = {
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
  };
  const { data: notifications, isLoading } = useGetNotifications<ParamsType, any>(params);
  const { open: drawerOpen } = useDrawerStore();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "user_id",
        header: "User ID",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "mentorship.student_reply",
        header: "Student Reply",
        enableEditing: false,
      },
      {
        accessorKey: "mentorship.mentor_reply",
        header: "Mentor Reply",
        enableEditing: false,
      },
      {
        accessorKey: "read_at",
        header: "Read At",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => {
          const readAt = row.original.read_at;
          if (readAt) return dayjs(readAt).format("MMM D, YYYY h:mm A");
          return "-";
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 3,
        Cell: ({ row }: any) => dayjs(row.original.updated_at).format("MMM D, YYYY h:mm A"),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: (notifications?.data as any) || [],
    enableColumnFilters: true,
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
        maxWidth: drawerOpen ? "calc(100vw - 245px)" : "calc(100vw - 65px)",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    // manualFiltering: true,
    // manualPagination: true,
    rowCount: notifications?.total,
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
      // columnFilters,
      // globalFilter,
    },
    // onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default NotificationTable;
