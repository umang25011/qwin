import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { UserDetails } from "../profile/profileSlice"

export interface Dashboard {
  users: UserDetails[]
}

export const initialDashboard: Dashboard = {
  users: [],
}

export const getAllUsers = () => async (dispath: AppDispatch) => {
  try {
    const userRef = collection(firestoreV9, FIREBASE_COLLECTIONS.users)

    const users: Dashboard["users"] = []
    const snapShot = await getDocs(userRef)
    //
    snapShot.forEach((doc) => {
      const { createdAt, ...user } = doc.data()
      users.push((user as unknown) as UserDetails)
    })
    dispath(storeAllUsers(users))
  } catch (error) {}
}

export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: initialDashboard,
  reducers: {
    storeAllUsers: (state, action: PayloadAction<Dashboard["users"]>) => {
      if (action.payload) state.users = action.payload
      return state
    },
  },
})

export default dashboardSlice.reducer

const { storeAllUsers } = dashboardSlice.actions
