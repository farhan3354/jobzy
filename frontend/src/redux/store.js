import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slices/authslices/userslice";

export const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
