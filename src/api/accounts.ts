import axios from "axios";
import { Account } from "../../types";

const fetchAccounts = async () => {
  const response = await axios.get("http://localhost:3001/accounts");
  return response.data;
};

const deleteAccount = async (id: number) => {
  const response = await axios.delete(`http://localhost:3001/accounts/${id}`);
  return response.data;
};

const fetchAccount = async (id: number) => {
  const response = await axios.get(`http://localhost:3001/accounts/${id}`);
  return response.data;
};

const createAcc = async (name: string, owner: string) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:3001/accounts",
    data: {
      name,
      owner,
    },
  });
  return response.data;
};

const changeAccount = async (id: number, name: string, owner: string) => {
  const data: Partial<Account> = {};

  if (name) {
    data.name = name;
  }

  if (owner) {
    data.owner = owner;
  }
  const response = await axios({
    method: "PUT",
    url: `http://localhost:3001/accounts/${id}`,
    data,
  });
  return response.data;
};

export { fetchAccounts, deleteAccount, fetchAccount, createAcc, changeAccount };
