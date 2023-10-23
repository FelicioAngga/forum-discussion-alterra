import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  user_uid: string;
  email: string | null;
  username: string | null;
  photoURL: string | null;
}

export interface AuthType {
  user?: User;
  fetchSuccess: boolean;
}

const initialState: AuthType = {
  user: undefined,
  fetchSuccess: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.fetchSuccess = true;
    },
    loggedInUserFailed: (state) => {
      state.user = undefined;
      state.fetchSuccess = true;
    },
    
    changeFetchSuccessToFalse: (state) => {
      state.fetchSuccess = false;
    },
  }
});

export const {
  loggedInUserSuccess,
  loggedInUserFailed,
  changeFetchSuccessToFalse,
} = authSlice.actions;

export default authSlice.reducer;
