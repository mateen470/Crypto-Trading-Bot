import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const exchangeSlice = createSlice({
  name: "exchanges",
  initialState,
  reducers: {
    setExchange: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;
