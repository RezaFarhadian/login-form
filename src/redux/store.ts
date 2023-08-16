import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import validationReducer from "../features/validation/validationSlice"
import createSagaMiddleware from "redux-saga"
import requestSignInSaga from "../sagas/requestSignIn"

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer: {
    auth: authReducer,
    validation: validationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(requestSignInSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
