import { all, call, put, takeLatest } from "redux-saga/effects"
import postSignIn from "../api/postSignIn"
import { saveToken, throwErr } from "../features/auth/authSlice"
import { PayloadAction } from "@reduxjs/toolkit"

export interface SignInInput {
  email: string
  password: string
}

export function* requestSignIn(action: PayloadAction<SignInInput>): any {
  try {
    const user = yield call(
      postSignIn,
      action.payload.email,
      action.payload.password
    )
    
    yield put({
      type: saveToken,
      payload: user.token
    })
  } catch (reason: any) {
    yield put({
      type: throwErr,
      payload: reason.response.data.error
    })
  }
}

export function* watchRequestSignIn() {
  yield takeLatest("AUTH_REQUEST_SIGN_IN", requestSignIn)
}

export default function* rootSaga() {
  yield all([
    watchRequestSignIn()
  ])
}
