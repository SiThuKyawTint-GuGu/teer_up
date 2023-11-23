"use client";
import { ParamsType } from "@/services/mentorship";
import { useGetNotifications } from "@/services/notification";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

const NotificationTable: React.FC = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const params: ParamsType = {
    page: pagination.pageIndex + 1,
    pagesize: pagination.pageSize,
  };
  if (columnFilters[0]) {
    params.status = columnFilters.find(filter => filter.id === "status")?.value as string;
  }
  const { data: notifications, isLoading } = useGetNotifications<ParamsType, any>(params);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "message",
        header: "Message",
        enableEditing: false,
      },
      // {
      //   accessorKey: "created_at",
      //   header: "Created At",
      //   enableEditing: false,
      //   size: 3,
      //   Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      // },
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
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    manualFiltering: true,
    manualPagination: true,
    rowCount: notifications?.data?.length,
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
      columnFilters,
    },
    // onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default NotificationTable;
