import { configureStore } from "@reduxjs/toolkit";
import {
  modalSliceReducer,
  todoSliceReducer,
  weatherSliceReducer,
} from "./slices";
import { weatherApiSlice } from "./features/weatherApi/weatherApiSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoSlice: todoSliceReducer,
      weatherSlice: weatherSliceReducer,
      modalSlice: modalSliceReducer,
      [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(weatherApiSlice.middleware),
  });
};
