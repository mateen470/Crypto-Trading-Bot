import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAssets } = assetSlice.actions;

export default assetSlice.reducer;
