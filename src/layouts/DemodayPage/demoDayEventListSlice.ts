import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { toastr } from "react-redux-toastr"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch, useAppSelector } from "../../store/store"
import { storeUserLocal } from "../login/loginSlice"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { UserDetails } from "../profile/profileSlice"
import { DemoDayEventDetails } from "../DemoDay/createDemoDaySlice"

export const initialEventsList: DemoDayEventDetails[] = []

export const fetchDemoDayEvents = () => async (dispatch: AppDispatch) => {
  try {
    const eventRef = collection(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents)
    const q = query(eventRef, orderBy("date"))
    const eventsSnapshot = await getDocs(q)

    const events: DemoDayEventDetails[] = []
    eventsSnapshot.forEach((doc) => {
      const data = doc.data()
      const now = new Date()
      events.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        address: data.address,
        date: data.date,
        isExpired: new Date(data.date) < now,
      })
    })
    events.sort((a, b) => Number(a.isExpired) - Number(b.isExpired))
    dispatch(setEventsList(events))
    // success
  } catch (error) {
    // error
  }
}

export const registerEvent = (event: DemoDayEventDetails, user: UserDetails) => async (dispatch: AppDispatch) => {
  try {
    const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, event.id)
    const attendeesRef = doc(eventRef, FIREBASE_COLLECTIONS.eventsSubAttendees, user.userID)

    await setDoc(attendeesRef, {
      name: user.name,
      email: user.email,
      studentID: user.studentID || "",
      userID: user.userID,
    })

    const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, user.userID)
    const user_event = { eventID: event.id, title: event.title, date: event.date }
    await updateDoc(userRef, {
      [FIREBASE_COLLECTIONS.usersSubEvent]: arrayUnion(event),
    })
    const updatedUser = { ...user }
    if (!updatedUser.user_events) updatedUser.user_events = []
    updatedUser.user_events = user.user_events ? [...user.user_events, event as EventDetails] : [event as EventDetails]
    // store event in Local Storage
    dispatch(storeUserLocal(updatedUser))
    toastr.success(`${event.title}`, "Event Registration Successful")

    console.log("Event Registered Successfully")
  } catch (e) {
    console.log(e)
  }
}

export const unregisterEvent = (event: EventDetails, user: UserDetails) => async (dispatch: AppDispatch) => {
  try {
    const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, event.id)
    const attendeesRef = doc(eventRef, FIREBASE_COLLECTIONS.eventsSubAttendees, user.userID)
    await deleteDoc(attendeesRef)
    const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, user.userID)
    await updateDoc(userRef, {
      [FIREBASE_COLLECTIONS.usersSubEvent]: arrayRemove(event),
    })
    const updatedUser = { ...user }
    updatedUser.user_events = user.user_events.filter((item) => item.id !== event.id)
    // store event in Local Storage
    dispatch(storeUserLocal(updatedUser))
    toastr.success(`${event.title}`, "Event Registration Cancelled")

    console.log("Event Registration Cancelled")
  } catch (e) {
    console.log("Error Unregistering Event", e)
  }
}

export const demoDayEventListSlice = createSlice({
  name: "Demo Day Event List",
  initialState: initialEventsList,
  reducers: {
    setEventsList: (state, action: PayloadAction<DemoDayEventDetails[]>) => {
      return [...action.payload]
    },
    registerForEvent: (
      state,
      action: PayloadAction<{ eventID: string; userID: string; name: string; email: string }>
    ) => {},
  },
})

export const { setEventsList, registerForEvent } = demoDayEventListSlice.actions
export default demoDayEventListSlice.reducer
