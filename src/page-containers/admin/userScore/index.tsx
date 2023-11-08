"use client";
import { useGetUserScores } from "@/services/userScore";
import dayjs from "dayjs";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useMemo, useState } from "react";

interface Props {
  id: string;
}
const UserScoreTable = ({ id }: Props) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { data: userScores, isLoading } = useGetUserScores<any>(id);
  // console.log("user scores", userScores);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 1,
      },
      // {
      //   accessorKey: "user_id",
      //   header: "User ID",
      //   enableEditing: false,
      //   size: 1,
      // },
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
    state: {
      showSkeletons: isLoading ?? false,
      isLoading,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default UserScoreTable;
