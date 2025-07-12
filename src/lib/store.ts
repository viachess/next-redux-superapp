import { configureStore } from "@reduxjs/toolkit";
import { todoSliceReducer } from "./slices";
import { weatherApiSlice } from "./features/weatherApi/weatherApiSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoSlice: todoSliceReducer,
      [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(weatherApiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
