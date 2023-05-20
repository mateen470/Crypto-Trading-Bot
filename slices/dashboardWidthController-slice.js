import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: typeof window !== "undefined" ? window.innerWidth : 0,
};

export const dashboardWidthControllerSlice = createSlice({
  name: "dashboardWidthControllerSlice",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setWidth } = dashboardWidthControllerSlice.actions;

export default dashboardWidthControllerSlice.reducer;
