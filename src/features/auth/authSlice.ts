import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../redux/store"

interface AuthState {
  token: string,
  error: string
}

const initialState: AuthState = {
  token: "",
  error: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    throwErr: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

export const { saveToken, throwErr } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectErr = (state: RootState) => state.auth.error

export default authSlice.reducer
