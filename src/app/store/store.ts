import { configureStore } from "@reduxjs/toolkit";
import { todoSliceReducer, weatherSliceReducer } from "./slices";
import { weatherApiSlice } from "./features/weatherApi/weatherApiSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoSlice: todoSliceReducer,
      weatherSlice: weatherSliceReducer,
      [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(weatherApiSlice.middleware),
  });
};
