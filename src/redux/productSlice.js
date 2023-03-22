import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startProcess: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    failedProcess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    //Get
    getAllProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    //Delete
    deleteProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((product) => product._id === action.payload),
        1
      );
    },
    //Edit
    editProductsSuccess: (state, action) => {
      state.isFetching = false;
      const productBeforeEdit = {
        ...state.products[
          state.products.findIndex(
            (product) => product._id == action.payload.id
          )
        ],
      };
      state.products[
        state.products.findIndex((product) => product._id == action.payload.id)
      ] = { ...productBeforeEdit, ...action.payload.data };
    },
    //Create
    createProductsuccess: (state, action) => {
      state.isFetching = false;
      state.products.push({ ...action.payload });
    },
  },
});

export const {
  startProcess,
  failedProcess,
  getAllProductsSuccess,
  deleteProductsSuccess,
  editProductsSuccess,
  createProductsuccess,
} = productSlice.actions;
export default productSlice.reducer;
