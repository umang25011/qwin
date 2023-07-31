import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { act } from "react-dom/test-utils"
import { toastr } from "react-redux-toastr"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestore, firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import produce from "immer"

export interface DemoDayEventDetails {
  id: string
  title: string
  description: string
  address: string
  date: string
  attendees?: {
    name: string
    email: string
    userID: string
    studentID?: string
  }[]
  // array of userID
  attendeed?: string[]
  isExpired?: boolean
}

export const initialEventDetails: DemoDayEventDetails = {
  id: "",
  title: "",
  description: "",
  address: "",
  date: "",
  attendeed: [],
  attendees: [],
}

export const getDemoDayEvent = (id: string) => async (dispatch: AppDispatch) => {
  const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, id)
  return getDoc(eventRef)
    .then((res) => {
      const data = res.data()
      if (data) {
        const event: DemoDayEventDetails = {
          title: data.title,
          description: data.description,
          address: data.address,
          date: data.date,
          id: res.id,
        }
        dispatch(storeEvent(event))
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getEventAttendees = (eventID: string) => async (dispatch: AppDispatch) => {
  const eventAttendeesRef = collection(
    firestoreV9,
    FIREBASE_COLLECTIONS.demoDayEvents,
    eventID,
    FIREBASE_COLLECTIONS.eventsSubAttendees
  )
  const eventAttendeedRef = collection(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, eventID, FIREBASE_COLLECTIONS.privateUnverifiedAttendees)

  getDocs(eventAttendeesRef)
    .then((snapshot) => {
      const users: DemoDayEventDetails["attendees"] = []
      snapshot.forEach((doc) => {
        users.push({
          name: doc.data().name,
          email: doc.data().email,
          userID: doc.id,
          studentID: doc.data()?.studentID || "",
        })
      })

      dispatch(storeAttendees(users))
    })
    .catch((err) => {
      console.log("Error Storing Attendees", err)
    })
  getDocs(eventAttendeedRef)
    .then((snapshot) => {
      const users: DemoDayEventDetails["attendeed"] = []

      snapshot.forEach((doc) => users.push(doc.id))
      dispatch(storeAttendeed(users))
    })
    .catch((err) => {
      console.log("Error Storing Attendeed", err)
    })
}

export const manageDemoDayEventSlice = createSlice({
  name: "Manage Demo Day Event",
  initialState: initialEventDetails,
  reducers: {
    storeEvent: (state, action: PayloadAction<DemoDayEventDetails>) => {
      state.address = action.payload.address
      state.title = action.payload.title
      state.date = action.payload.date
      state.id = action.payload.id
      state.description = action.payload.description
    },
    createEvent: (state, action: PayloadAction<DemoDayEventDetails>) => {
      // firestore.collection("events").add(action.payload)
      setDoc(doc(collection(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents)), action.payload)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Created`, "Demo Day Event Created Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    deleteEvent: (state, action: PayloadAction<DemoDayEventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, action.payload.id)
      deleteDoc(eventRef)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Deleted`, "Demo Day Event Deleted Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    getEvent: (state, action: PayloadAction<{ id: string }>) => {},
    updateEvent: (state, action: PayloadAction<DemoDayEventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.demoDayEvents, action.payload.id)
      console.log("UPdated Event Dispatch: ", action.payload)

      setDoc(eventRef, action.payload, { merge: true })
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Updated`, "Demo Day Event Updated Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    getEventAttendees: (state, action: PayloadAction<DemoDayEventDetails>) => {
      // firestore.collection("events").add(action.payload)
    },
    storeAttendees: (state, action: PayloadAction<DemoDayEventDetails["attendees"]>) => {
      if (action.payload) {
        state.attendees = action.payload
      }

      return state
    },
    storeAttendeed: (state, action: PayloadAction<DemoDayEventDetails["attendeed"]>) => {
      if (action.payload) state.attendeed = action.payload
      return state
    },
  },
})

export const { createEvent, deleteEvent, getEvent, updateEvent, storeEvent, storeAttendeed, storeAttendees } =
  manageDemoDayEventSlice.actions

export default manageDemoDayEventSlice.reducer
