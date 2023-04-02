import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { publicRequest } from "./requestMethods";

export const login = async (navigate, from, dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user, {
      withCredentials: true, // to set cookies httpOnly from backend server
    });
    dispatch(loginSuccess(res.data));
    navigate(from, { replace: true });
    console.log(res.data);
  } catch (error) {
    dispatch(loginFailure(error?.response?.data));
    console.log(error);
  }
};

export const logout = async (dispatch) => {
  try {
    const res = await publicRequest.get("/auth/logout");
    dispatch(resetUser());
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updateAccessToken: (state, action) => {
      state.currentUser.accessToken = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logoutFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetUser: () => initialState,
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("root");
    });
  },
});

export const {
  loginStart,
  logoutStart,
  loginSuccess,
  loginFailure,
  logoutFailure,
  clearError,
  resetUser,
  updateAccessToken,
} = userSlice.actions;
export default userSlice.reducer;
