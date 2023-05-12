import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getSingleAccount, updateAccount } from "../../redux/modules/accounts";
import { RootState } from "../../redux/store";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { CircularProgress } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AccountDetails = () => {
  const dispatch = useDispatch();
  let { accountId } = useParams();

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

  const handleUpdateAccount = () => {
    if (account) {
      dispatch(updateAccount({ id: account.id, name, owner }));
    }

    setName("");
    setOwner("");
    setOpen(false);
  };

  const account = useSelector(
    (state: RootState) => state.accounts.singleAccount
  );

  const loading = useSelector((state: RootState) => state.accounts.loading);

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
      name: "updatedOn",
      label: "Updated On",
      options: {
        customBodyRender: (value?: Date) => {
          if (!value) {
            return "No Updated Date";
          }
          return new Date(value).toDateString();
        },
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Update
          </Button>
        ),
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filter: false,
    sort: false,
    search: false,
    selectableRows: "none",
    download: false,
    print: false,
    pagination: false,
    viewColumns: false,
    responsive: "simple",
  };

  useEffect(() => {
    if (accountId) {
      dispatch(getSingleAccount(+accountId));
    }
  }, [dispatch, accountId]);

  if (!account || loading) {
    return <CircularProgress />;
  }

  if (account) {
    return (
      <>
        <MUIDataTable
          title={account.name}
          data={[account]}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Account</DialogTitle>
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
            <Button onClick={handleUpdateAccount}>Update</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return <Navigate to={"/"} />;
};

export default AccountDetails;
