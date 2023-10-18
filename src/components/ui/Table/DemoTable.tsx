import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  type MRT_TableOptions,
} from "material-react-table";
import { useMemo } from "react";
import { type User } from "./makeData";

interface Props {
  loading: boolean;
  error: any;
  data: any;
  tableColumns: any;
  setValidationErrors: (arg: any) => void;
}

const Table: React.FC<Props> = ({ data, tableColumns, setValidationErrors, loading }: Props) => {
  // const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const columns = useMemo(() => tableColumns, [tableColumns]);

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
    data,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: row => row.id,
    muiToolbarAlertBannerProps: loading
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
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;

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

const createMuiEditTextFieldProps = (
  accessorKey: string,
  validationErrors: Record<string, string | undefined> = {},
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  > = () => {}
) => {
  return {
    type: "email",
    required: true,
    error: !!validationErrors?.[accessorKey],
    helperText: validationErrors?.[accessorKey],
    onFocus: () =>
      setValidationErrors({
        ...validationErrors,
        [accessorKey]: undefined,
      }),
  };
};

export const createColumn = (
  accessorKey: string,
  header: string,
  validationErrors: Record<string, string | undefined> = {},
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>,
  muiEditTextFieldProps: Record<string, any> = {}
): Record<string, any> => {
  return {
    accessorKey,
    header,
    muiEditTextFieldProps: {
      ...createMuiEditTextFieldProps(accessorKey, validationErrors, setValidationErrors),
      ...muiEditTextFieldProps,
    },
  };
};
