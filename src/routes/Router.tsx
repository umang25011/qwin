import React, { useEffect } from "react"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate, useSearchParams } from "react-router-dom"
import { LOCAL_STORAGE } from "../config/localStorage"
import PrivateRoute from "../config/PrivateRoute"
import EventsList from "../layouts/eventsList/EventsList"
import Login from "../layouts/login/Login"
import ManageEvents from "../layouts/manageEvent/ManageEvents"
import Profile from "../layouts/profile/Profile"
import { useAppDispatch, useAppSelector } from "../store/store"
import { getUserLocal } from "../layouts/login/loginSlice"
import Verification from "../layouts/verification/Verification"
import QrScan from "../layouts/verification/QRScanner"
import Header from "../layouts/header/Header"
import UserHomePage from "../layouts/userHomePage/UserHomePage"
import Dashboard from "../layouts/dashboard/Dashboard"
import Test from "../layouts/dashboard/Test"
// import Dashboard from "../components/dashboard/Dashboard";
// import NotProtectedRoute from "./NotProtectedRoute";
// import EventDetail from "../components/event/EventDetail";
// import User from "../components/user/User";
// import ProtectedRoute from "./ProtectedRoute";
// import People from "../components/people/People";
// import CreateEditEvent from "../components/event/CreateEditEvent";
// import Settings from "../components/settings/Settings";
// import Authenticate from "../components/auth/Authenticate";

const Router = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = LOCAL_STORAGE.getUser()
    dispatch(getUserLocal())
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") window.location.href = "/login"
    } else if (!user.studentID) {
      if (window.location.pathname !== "/profile") window.location.href = "/profile"
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<ManageEvents />} />
        <Route path="/events/:id?" element={<ManageEvents />} />
        <Route path="/start-verification" element={<Verification />} />
        <Route path="/qr-scanner" element={<QrScan />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
