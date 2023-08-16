import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../redux/store"

interface ValidationState {
  validEmail: boolean
  validPassword: boolean
}

const initialState: ValidationState = {
  validEmail: false,
  validPassword: false
}

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    checkEmail: (state, action: PayloadAction<string>) => {
      if (/\S+@\S+\.\S+/.test(action.payload)) {
        state.validEmail = true
      } else {
        state.validEmail = false
      }
    },
    checkPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length >= 8) {
        state.validPassword = true
      } else {
        state.validPassword = false
      }
    }
  }
})

export const { checkEmail, checkPassword } = validationSlice.actions

export const clearToProceed = (state: RootState) =>
  state.validation.validEmail && state.validation.validPassword

export default validationSlice.reducer
