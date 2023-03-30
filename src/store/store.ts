import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { TypedUseSelectorHook } from "react-redux/es/types"
import commonReducer from "../config/commonSlice"
import loginReducer from "../layouts/login/loginSlice"
import manageEventReducer from "../layouts/manageEvent/manageEventSlice"
import { reducer as toastrReducer } from "react-redux-toastr"
import eventsListReducer from "../layouts/eventsList/eventsListSlice"
import verificationReducer from "../layouts/verification/verificationSlice"
import qrScannerSlice from "../layouts/verification/qrScannerSlice"
import dashboardSlice from "../layouts/dashboard/dashboardSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    commonData: commonReducer,
    manageEvent: manageEventReducer,
    toastr: toastrReducer,
    eventsList: eventsListReducer,
    verification: verificationReducer,
    qrScanner: qrScannerSlice,
    dashboard: dashboardSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
