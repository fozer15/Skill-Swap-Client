import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { useMemo } from "react";

//@ts-ignore
const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
