import { configureStore } from "@reduxjs/toolkit";
import { todoSliceReducer } from "./slices";
import { apiSlice } from "./features/api/apiSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoSlice: todoSliceReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
