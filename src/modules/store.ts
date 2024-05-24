import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "@modules/searchSlice";
import { chartReducer } from "@modules/chartSlice";
import { createLogger } from "redux-logger";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    searchReducer,
    chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
