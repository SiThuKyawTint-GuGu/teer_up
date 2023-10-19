// "use client";
// import { Button } from "@/components/ui/Button";
// import Table from "@/components/ui/Table/Table";
// import { useGetBlogCategory } from "@/services/blogCategory";
// import { ContentCategoryResponse } from "@/types/ContentCategory";
// import { Box } from "@radix-ui/themes";
// import Link from "next/link";
// import { AiOutlinePlus } from "react-icons/ai";
// import { BlogCategoryTableColumn } from "./blogCategoryTableColumn";

// const BlogCategory = () => {
//   const {
//     data: contentCategories,
//     isLoading,
//     error,
//   } = useGetBlogCategory<ContentCategoryResponse>();

//   if (isLoading) return <p>Loading...</p>;
//   return (
//     <>
//       {error && <p>{error}</p>}
//       <Box className="bg-white p-10 rounded-md">
//         <div className="flex justify-between">
//           <p className="text-lg">Blog Category</p>
//           <Link href={"/admin/blogs/category/0"}>
//             <Button className="p-2 mb-5 rounded-md w-full text-white" type="submit">
//               Create new catetory <AiOutlinePlus color="white" size={20} />
//             </Button>
//           </Link>
//         </div>
//         {contentCategories?.data && (
//           <Table tableColumns={BlogCategoryTableColumn} tableData={contentCategories?.data} />
//         )}
//       </Box>
//     </>
//   );
// };

// export default BlogCategory;

"use client";
import { Button } from "@/components/ui/Button";
import { fakeData, usStates, type User } from "@/components/ui/Table/makeData";
import { useGetBlogCategory } from "@/services/blogCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  type MRT_Row,
  type MRT_TableOptions,
} from "material-react-table";
import { useMemo, useState } from "react";

const BlogCategory = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "state",
        header: "State",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  // const { data: createUser, isLoading: isCreatingUser } = useCreateUser();
  //call READ hook
  const { data: categories, isLoading } = useGetBlogCategory();
  console.log("blog category -> ", categories);
  //call UPDATE hook
  // const { data: updateUser, isLoading: isUpdatingUser } = useUpdateUser();
  //call DELETE hook
  // const { data: deleteUser, isLoading: isDeletingUser } = useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some(error => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fakeData,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: row => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};
export default BlogCategory;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName) ? "First Name is Required" : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
