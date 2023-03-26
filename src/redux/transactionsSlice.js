import { createSlice } from "@reduxjs/toolkit";

initialState = {
  transactions: {},
  isFetching: false,
  error: "",
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    startProcess: (state) => {
      state.isFetching = true;
    },
    failedProcess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getAllTransactions: (state, action) => {
      state.transactions = {};
    },
  },
});
