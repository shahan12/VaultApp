import { configureStore } from "@reduxjs/toolkit";
import AllSafeReducer from "../actions/AllSafeSlice";

export default configureStore({
  reducer: {
    allSafe: AllSafeReducer
  },
});
