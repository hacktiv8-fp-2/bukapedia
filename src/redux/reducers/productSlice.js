import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const resp = await axios.get("https://fakestoreapi.com/products/");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});
export const getProductByFilter = createAsyncThunk(
  "product/getProductByFilter",
  async (url) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  product: [],
  filterProduct: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateCheckOutProduct: (state, action) => {
      let objectIndex;
      action.payload.map(
        (item) => (
          (objectIndex = state.product.findIndex(
            (prod) => prod.id === item.id
          )),
          (state.product[objectIndex].quantity -= item.quantity)
        )
      );
    },
    updateQuantityProduct: (state, action) => {
      action.payload.map((item) => {
        const objectIndex = state.product.findIndex(
          (prod) => prod.id === item.id
        );
        state.product[objectIndex].quantity = item.quantity;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product.length === 0
          ? (state.product = action.payload.map((item) => ({
              ...item,
              quantity: 20,
            })))
          : null;
        state.isLoading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      })
      //Filter Case
      .addCase(getProductByFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductByFilter.fulfilled, (state, action) => {
        let objectQuantity;
        state.filterProduct = action.payload.map(
          (item) => (
            (objectQuantity = state.product.find(
              (prod) => prod.id === item.id
            )?.quantity),
            { ...item, quantity: objectQuantity }
          )
        );
        state.isLoading = false;
      })
      .addCase(getProductByFilter.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      });
  },
});

export const { updateQuantityProduct, updateCheckOutProduct } =
  productSlice.actions;
export default productSlice.reducer;
