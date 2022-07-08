import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// import { fake_fetch } from "../apis/api";
import { IProduct } from "../interfaces/IProduct";

import { RootState } from "./store";

interface IProductSliceState {
  products: Array<IProduct>;
  isLoading: boolean;
  error?: string;
}

const initialState: IProductSliceState = {
  products: [],
  isLoading: false,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    /**
     *
     *  This is the MOCK FETCH I used when the backend was not ready yet!
     *
     */
    // const response = await fake_fetch(
    //   `${process.env.REACT_APP_BACKEND_URL}/products`,
    //   "GET"
    // );

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products`,
        { timeout: 3000 }
      );

      const responseData = response.data;

      return responseData.products;
    } catch (error) {
      return null;
    }
  }
);

export const saveChanges = createAsyncThunk(
  "products/getAllProducts",
  async (products: Array<IProduct>) => {
    /**
     *
     * In here any product rename and change will be saved to the database
     */

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/save`,
      { products },
      {
        timeout: 3000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return data.products;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductName: (
      state,
      action: PayloadAction<{ id: string; newName: string | null }>
    ) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? {
              ...product,
              name: action.payload.newName!,
            }
          : product
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllProducts.pending, (state: IProductSliceState) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state: IProductSliceState, action) => {
        // Add user to the state array
        state.isLoading = false;
        state.products = action.payload!;
      }
    );
    builder.addCase(
      getAllProducts.rejected,
      (state: IProductSliceState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { updateProductName } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
