import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { act } from "react-dom/test-utils"
import { toastr } from "react-redux-toastr"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestore, firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import produce from "immer"

export interface EventDetails {
  id: string
  title: string
  description: string
  address: string
  date: string
  attendees?: {
    name: string
    email: string
    userID: string
  }[]
  // array of userID
  attendeed?: string[]
  isExpired?: boolean
}

export const initialEventDetails: EventDetails = {
  id: "",
  title: "",
  description: "",
  address: "",
  date: "",
  attendeed: [],
  attendees: [],
}

export const getEventFunction = (id: string) => async (dispatch: AppDispatch) => {
  const eventRef = doc(firestoreV9, "events", id)
  return getDoc(eventRef)
    .then((res) => {
      const data = res.data()
      if (data) {
        const event: EventDetails = {
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
  const eventAttendeesRef = collection(firestoreV9, "events", eventID, FIREBASE_COLLECTIONS.eventsSubAttendees)
  const eventAttendeedRef = collection(firestoreV9, "events", eventID, FIREBASE_COLLECTIONS.privateUnverifiedAttendees)

  getDocs(eventAttendeesRef)
    .then((snapshot) => {
      const users: EventDetails["attendees"] = []
      snapshot.forEach((doc) => {
        users.push({
          name: doc.data().name,
          email: doc.data().email,
          userID: doc.id,
        })
      })

      dispatch(storeAttendees(users))
    })
    .catch((err) => {
      console.log("Error Storing Attendees", err)
    })
  getDocs(eventAttendeedRef)
    .then((snapshot) => {
      const users: EventDetails["attendeed"] = []

      snapshot.forEach((doc) => users.push(doc.id))
      dispatch(storeAttendeed(users))
    })
    .catch((err) => {
      console.log("Error Storing Attendeed", err)
    })
}

export const manageEventSlice = createSlice({
  name: "Manage Events",
  initialState: initialEventDetails,
  reducers: {
    storeEvent: (state, action: PayloadAction<EventDetails>) => {
      state.address = action.payload.address
      state.title = action.payload.title
      state.date = action.payload.date
      state.id = action.payload.id
      state.description = action.payload.description
    },
    createEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      setDoc(doc(collection(firestoreV9, "events")), action.payload)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Created`, "Event Created Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    deleteEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, "events", action.payload.id)
      deleteDoc(eventRef)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Deleted`, "Event Deleted Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    getEvent: (state, action: PayloadAction<{ id: string }>) => {},
    updateEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, "events", action.payload.id)
      setDoc(eventRef, action.payload, { merge: true })
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Updated`, "Event Updated Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    getEventAttendees: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
    },
    storeAttendees: (state, action: PayloadAction<EventDetails["attendees"]>) => {
      if (action.payload) {
        state.attendees = action.payload

      }

      return state
    },
    storeAttendeed: (state, action: PayloadAction<EventDetails["attendeed"]>) => {
      if (action.payload) state.attendeed = action.payload
      return state
    },
  },
})

export const {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
  storeEvent,
  storeAttendeed,
  storeAttendees,
} = manageEventSlice.actions

export default manageEventSlice.reducer
