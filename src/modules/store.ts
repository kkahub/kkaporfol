import { chartReducer } from "@modules/chartSlice";
import { searchReducer } from "@modules/searchSlice";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

export type RootState = {
  chartReducer: ReturnType<typeof chartReducer>;
  searchReducer: ReturnType<typeof searchReducer>;
};

const logger = createLogger();

export const store = configureStore({
  reducer: {
    searchReducer,
    chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      logger as unknown as ReturnType<typeof getDefaultMiddleware>[0],
    ),
  devTools: process.env.CURRENT_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
