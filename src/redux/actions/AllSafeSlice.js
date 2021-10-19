import { createSlice } from "@reduxjs/toolkit";
import { connectAdvanced } from "react-redux";
// import AllSafes from "../safes/AllSafes";
// import AllSafesItem from "../safes/AllSafes";
// import AllSafes from "../../../screens/allsafe/AllSafes";

import AllSafes from "../../screens/safes/safeFolder/allSafes/AllSafes";

const AllSafeSlice = createSlice({
  name: "allSafes",
  initialState: [],
  reducers: {
    addSafe: (state, action) => {
      const newSafe = {
        id: Date.now(),
        SafeName: action.payload.SafeName,
        Owner: action.payload.Owner,
        Description: action.payload.Description,
        completed: false,
        folder: [],
        enable: false,
      };
      state.push(newSafe);
    },
    deleteSafe: (state, action) => {
      return state.filter(
        (allSafes) => allSafes.SafeName !== action.payload.SafeName
      );
    },
    toggleAdd: (state, action) => {
      return state.map((enableState) =>
        enableState.id === action.payload.id
          ? { ...enableState, enable: true }
          : enableState
      );
    },
    editSafe: (state, action) => {
      const updatedState = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = updatedState;
    },
    editFolder: (state, action) => {
      state.map((s) =>
      s.id === action.payload.id ? {
        ...s, folder: [...s.folder, s.folder.push(action.payload.folder)] } : s );
  },
  },
});

export const { addSafe, toggleAdd, deleteSafe, editSafe, editFolder } =
  AllSafeSlice.actions;

export default AllSafeSlice.reducer;
