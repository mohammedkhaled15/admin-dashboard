import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: [],
  isFetching: false,
  error: "",
};

const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    startProcess: (state) => {
      state.isFetching = true;
    },
    failedProcess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      // console.log(action.payload);
    },
    getAllUsersData: (state, action) => {
      state.isFetching = false;
      state.usersData = action.payload;
    },
    updateUserData: (state, action) => {
      state.isFetching = false;
      const userIndex = state.usersData.findIndex(
        (user) => user._id == action.payload.id
      );
      state.usersData[userIndex] = {
        ...state.usersData[userIndex],
        ...action.payload.userNewData,
      };
    },
  },
});

export const { startProcess, failedProcess, getAllUsersData, updateUserData } =
  usersDataSlice.actions;

export default usersDataSlice.reducer;
