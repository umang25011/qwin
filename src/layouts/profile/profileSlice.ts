import { createSlice } from "@reduxjs/toolkit"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { USER_ROLES } from "../../config/helper"

export interface UserDetails {
  name: string
  email: string
  program: string
  mobileNo: string
  userID: string
  studentID: string
  userRole: string
  user_events: EventDetails[]
  events_attended: {
    eventID: string
  }[]
}

export const initialUserProfile: UserDetails = {
  name: "",
  email: "",
  userID: "",
  mobileNo: "",
  userRole: "",
  program: "MAC Summer 22",
  studentID: "",
  user_events: [],
  events_attended: [],
}
