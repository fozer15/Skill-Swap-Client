import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { stripIgnoredCharacters } from "graphql";

export interface UserState {
  info: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const initialState: UserState = {
  info: {
    first_name: "fatih",
    last_name: "ozer",
    email: "a",
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.user;

export default authSlice.reducer;
