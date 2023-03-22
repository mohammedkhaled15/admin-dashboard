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
    //Get
    getAllProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getAllProductsFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //Delete
    deleteProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((product) => product._id === action.payload),
        1
      );
    },
    deleteProductsFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //Edit
    editProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
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
    editProductsFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailed,
  deleteProductsStart,
  deleteProductsSuccess,
  deleteProductsFailed,
  editProductsStart,
  editProductsSuccess,
  editProductsFailed,
} = productSlice.actions;
export default productSlice.reducer;
