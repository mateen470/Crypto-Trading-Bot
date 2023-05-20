import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "./slices/exchange-slice";
import assetReducer from "./slices/asset-slice";
import dashboardWidthControllerReducer from "./slices/dashboardWidthController-slice";

export const store = configureStore({
  reducer: {
    exchanges: exchangeReducer,
    asset: assetReducer,
    dashboardWidth: dashboardWidthControllerReducer,
  },
});
