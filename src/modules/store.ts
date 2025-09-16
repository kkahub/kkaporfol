import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { chartReducer } from "@modules/chartSlice";
import { searchReducer } from "@modules/searchSlice";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    searchReducer,
    chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.CURRENT_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
