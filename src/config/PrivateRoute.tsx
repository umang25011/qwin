import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, redirect, Route, RouteProps, useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/store"

export default function PrivateRoute(props: RouteProps): React.ReactElement | null {
  const commonData = useAppSelector((state) => state.commonData)
return <div></div>
  // return commonData.userProfileComplete ? (
  //   <Outlet />
  // ) : commonData.userLoggedIn ? (
  //   <Navigate to="/profile" />
  // ) : (
  //   <Navigate to="/login" />
  // )
}
