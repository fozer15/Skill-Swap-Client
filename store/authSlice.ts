import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { storeKeyNameFromField } from "@apollo/client/utilities";

export interface UserState {
  data: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

let initialState: UserState = {
  data: {
    first_name: "",
    last_name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        data: {
          ...action.payload.user.data,
        },
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user.data;

export default userSlice.reducer;
