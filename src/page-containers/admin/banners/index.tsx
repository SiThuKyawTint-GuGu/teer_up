"use client";

import { Badge, Box, Button, Chip, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { MRT_Row, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import Link from "next/link";
import { generateCsv, mkConfig, download } from "export-to-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useDeleteBanner, useGetBanner } from "@/services/banner";
import LoadingButton from "@mui/lab/LoadingButton";
import { BannerDataResponse } from "@/types/Banner";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "banners",
});

export default function Banner() {
  const [banners, setBanners] = useState<any>();
  const { trigger: deleteTrigger, isMutating: deletingBanner } = useDeleteBanner();
  const { data: bannersData, isLoading, mutate } = useGetBanner<BannerDataResponse>();
  const [open, setOpen] = useState<boolean>(false);
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setBanners(bannersData?.data);
  }, [bannersData?.data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 2,
      },
      {
        accessorKey: "image_url",
        header: "Image",
        enableEditing: false,

        Cell: ({ row }: any) => (
          <Image
            onClick={() => {
              setImageOpen(true);
              setImageUrl(row.original.image_url);
            }}
            src={row.original.image_url}
            alt={row.original.name}
            width={75}
            height={75}
            className="object-cover"
          />
        ),
      },
      {
        accessorKey: "is_active",
        header: "Active Status",
        Cell: ({ row }: any) =>
          row.original.is_active ? <Chip label="Active" color="success" /> : <Chip label="Inactive" />,
      },
      {
        accessorKey: "external_link_url",
        header: "Link",
        enableEditing: true,
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
    data: (banners as any) || [],
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
    rowCount: banners?.data?.length,
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
          <Link href={`/admin/banners/${row.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
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
      <div>
        <Button variant="contained" color="error" sx={{ background: "#DA291C", textTransform: "none" }}>
          <Link href={"/admin/banners/0"}>Create New Banner</Link>
        </Button>
        <Button
          sx={{ marginLeft: "5px", textTransform: "none" }}
          variant="contained"
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Banner Data
        </Button>
      </div>
    ),
  });

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map(row => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleDeleteBanner = async () => {
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
            Are you sure you want to delete this banner ID <span className="text-red-700 font-semibold">[{id}]</span>?
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
                loading={deletingBanner}
                onClick={handleDeleteBanner}
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
      <Modal open={imageOpen} onClose={() => setImageOpen(false)}>
        <Box sx={style}>
          <Image src={imageUrl} alt="Banner" width={400} height={400} />
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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
