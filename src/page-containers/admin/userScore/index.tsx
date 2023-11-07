"use client";
import { useGetUserScores } from "@/services/user";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";

const UserScoreTable: React.FC = () => {
  // const [pagination, setPagination] = useState<MRT_PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  // const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  // const { data: mentorships, isLoading } = useGetMentorship<ParamsType, any>({
  //   page: pagination.pageIndex + 1,
  //   pagesize: pagination.pageSize,
  //   search: globalFilter || "",
  //   // status: columnFilters[0]?.value,
  // });
  const { data: userScores, isLoading } = useGetUserScores();
  // console.log("user scores", userScores);

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
        accessorKey: "skill",
        header: "Skill",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "certainty",
        header: "Certainty",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "dimension.name",
        header: "Dimension",
        enableEditing: false,
        size: 1,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
        size: 2,
        Cell: ({ row }: any) => dayjs(row.original.created_at).format("MMM D, YYYY h:mm A"),
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        enableEditing: false,
        size: 2,
        Cell: ({ row }: any) => dayjs(row.original.updated_at).format("MMM D, YYYY h:mm A"),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: (userScores?.data as any) || [],
    enableColumnFilters: false,
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
    // manualFiltering: true,
    // initialState: {
    //   pagination: {
    //     pageSize: 10,
    //     pageIndex: 0,
    //   },
    // },

    state: {
      showSkeletons: isLoading ?? false,
      // pagination,
      isLoading,
      // columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    // onPaginationChange: setPagination,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default UserScoreTable;
