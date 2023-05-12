import { useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import {
  createAccount,
  getAccounts,
  removeAccount,
} from "../../redux/modules/accounts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setOwner("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value);
  };

  const handleCreateAccount = () => {
    dispatch(createAccount({ name, owner }));

    setName("");
    setOwner("");
    setOpen(false);
  };

  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "createdOn",
      label: "Created On",
      options: {
        customBodyRender: (value: Date) => {
          return new Date(value).toDateString();
        },
      },
    },
    {
      name: "owner",
      label: "Owner",
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/accounts/${tableMeta.rowData[0]}`)}
          >
            View
          </Button>
        ),
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filter: false,
    sort: false,
    search: false,
    selectableRows: "single",
    download: false,
    print: false,
    pagination: false,
    viewColumns: false,
    onRowsDelete: (item) => {
      const account = accounts[item.data[0].index];
      dispatch(removeAccount(account.id));
    },
    responsive: "simple",
    customToolbar: () => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add new Account
        </Button>
      );
    },
  };

  return (
    <>
      <MUIDataTable
        title="Accounts"
        data={accounts}
        columns={columns}
        options={options}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Account Name"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            label="Account Owner"
            fullWidth
            value={owner}
            onChange={handleOwnerChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateAccount}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Accounts;
