import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAccounts,
  deleteAccount,
  fetchAccount,
  createAcc,
  changeAccount,
} from "../../api/accounts";
import { Account } from "../../../types";

interface InitState {
  accounts: Account[];
  singleAccount: Account | null;
  loading: boolean;
}

const initialState: InitState = {
  accounts: [],
  singleAccount: null,
  loading: true,
};

export const createAccount: any = createAsyncThunk(
  "accounts/createAccount",
  async ({ name, owner }: Pick<Account, "name" | "owner">) => {
    const response = await createAcc(name, owner);

    return response;
  }
);

export const updateAccount: any = createAsyncThunk(
  "accounts/updateAccount",
  async ({ id, name, owner }: Pick<Account, "name" | "owner" | "id">) => {
    const response = await changeAccount(id, name, owner);

    return response;
  }
);

export const getAccounts: any = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    const response = await fetchAccounts();

    return response;
  }
);

export const removeAccount: any = createAsyncThunk(
  "accounts/removeAccount",
  async (id: number) => {
    await deleteAccount(id);

    return id;
  }
);

export const getSingleAccount: any = createAsyncThunk(
  "accounts/getSingleAccount",
  async (id: number) => {
    const response = await fetchAccount(id);

    return response;
  }
);

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getSingleAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAccount = action.payload;
      })
      .addCase(getSingleAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAccount = action.payload;
      })
      .addCase(removeAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(
          (acc) => acc.id !== action.payload
        );
      });
  },
});

export const { addAccount } = accountSlice.actions;
export default accountSlice.reducer;
