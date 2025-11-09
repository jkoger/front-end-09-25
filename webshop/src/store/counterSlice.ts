import { createSlice } from "@reduxjs/toolkit";
import type { CartProduct } from "../models/CartProduct";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: calculateCount(),
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },
    zero: (state) => {
      state.value = 0;
    },
  },
});

function calculateCount() {
  const cartLs: CartProduct[] = JSON.parse(
    localStorage.getItem("cart") || "[]",
  );
  let sum = 0;

  cartLs.forEach((cp) => (sum += cp.quantity));
  return sum;
}

// Action creators are generated for each case reducer function
export const { increment, decrement, decrementByAmount, zero } =
  counterSlice.actions;

export default counterSlice.reducer;
