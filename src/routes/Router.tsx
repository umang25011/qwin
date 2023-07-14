import { useEffect, useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LOCAL_STORAGE } from "../config/localStorage"
import Dashboard from "../layouts/dashboard/Dashboard"
import ChooseProjects from "../layouts/DemoDay/ChooseProjects"
import CreateProjectForm from "../layouts/DemoDay/CreateProjectForm"
import Login from "../layouts/login/Login"
import { getUserFromFirestore } from "../layouts/login/loginSlice"
import ManageEvents from "../layouts/manageEvent/ManageEvents"
import Profile from "../layouts/profile/Profile"
import UserHomePage from "../layouts/userHomePage/UserHomePage"
import QrScan from "../layouts/verification/QRScanner"
import Verification from "../layouts/verification/Verification"
import { useAppDispatch } from "../store/store"
import { log } from "console"
import { USER_ROLES } from "../config/helper"
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

  const user = LOCAL_STORAGE.getUser()

  useEffect(() => {

    // dispatch(getUserLocal())
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") window.location.href = "/login"
    } else if (!user.studentID) {
      if (window.location.pathname !== "/profile") window.location.href = "/profile"
    }

    return () => {}
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
        <Route path="/dempday-create-project" element={<CreateProjectForm />} />
        <Route path="/demoday-choose-project" element={<ChooseProjects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
