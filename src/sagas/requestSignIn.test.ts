import { call } from "redux-saga/effects"
import { SignInInput, requestSignIn } from "./requestSignIn"
import postSignIn from "../api/postSignIn"
import { put } from "redux-saga/effects"
import { saveToken } from "../features/auth/authSlice"
import { createAction } from "@reduxjs/toolkit"

const createRequestSignInAction = createAction<SignInInput>("AUTH_REQUEST_SIGN_IN")
const requestSignInAction = createRequestSignInAction({
  email: "eve.holt@reqres.in",
  password: "1234"
})

const user = {
  token: "1xy2z3t4eight596"
}

const iterator = requestSignIn(requestSignInAction)

describe("requestSignIn", () => {
  test("should yield an Effect call(postSignIn, action.payload.email, action.payload.password)", () => {
    expect(iterator.next().value).toStrictEqual(
      call(
        postSignIn,
        requestSignInAction.payload.email,
        requestSignInAction.payload.password
      )
    )
  })

  test("should yield an Effect put({ type: saveToken, payload: user.token })", () => {
    expect(iterator.next(user).value).toStrictEqual(
      put({
        type: saveToken,
        payload: user.token
      })
    )
  })
})
