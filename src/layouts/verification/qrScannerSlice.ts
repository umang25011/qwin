// QrScannerSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"
import QrScanner from "qr-scanner"
import { toastr } from "react-redux-toastr"
import { NavigateFunction } from "react-router-dom"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { unregisterEvent } from "../eventsList/eventsListSlice"
import { storeUserLocal } from "../login/loginSlice"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { UserDetails } from "../profile/profileSlice"

interface QrScannerState {
  qrCodeData: string | null
  isLoading: boolean
  error: string | null
}

const initialState: QrScannerState = {
  qrCodeData: null,
  isLoading: false,
  error: null,
}

const qrScannerSlice = createSlice({
  name: "qrScanner",
  initialState,
  reducers: {
    scanQrCodeStart(state) {
      state.isLoading = true
      state.error = null
    },
    scanQrCodeSuccess(state, action: PayloadAction<string>) {
      state.qrCodeData = action.payload
      state.isLoading = false
      state.error = null
    },
    scanQrCodeFailure(state, action: PayloadAction<any>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { scanQrCodeStart, scanQrCodeSuccess, scanQrCodeFailure } = qrScannerSlice.actions

export default qrScannerSlice.reducer

export const uploadVerificationToEvent = (
  hash: string,
  eventID: string,
  user: UserDetails,
  scannerRef: React.MutableRefObject<QrScanner | undefined>,
  navigate: NavigateFunction
) => async (dispatch: AppDispatch) => {
  dispatch(scanQrCodeStart())
  try {
    // Upload the QR code image to Event
    const eventRef = await doc(firestoreV9, FIREBASE_COLLECTIONS.events, eventID)

    const privateCollectionRef = await doc(eventRef, FIREBASE_COLLECTIONS.privateUnverifiedAttendees, user.userID)
    await setDoc(privateCollectionRef, { hash: hash, date: new Date().toISOString() }, { merge: true })
    console.log("Qr Code Data Upload Successfull")

    const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, user.userID)
    const user_event = { eventID: eventID }
    await updateDoc(userRef, {
      [FIREBASE_COLLECTIONS.eventsAttended]: arrayUnion(user_event),
    })
    // destroy the scanner ref
    if (scannerRef.current) scannerRef.current.destroy()
    const updatedUser = { ...user }
    if (!updatedUser.events_attended) updatedUser.events_attended = [user_event]
    else updatedUser.events_attended = [...user.events_attended, user_event]
    // store event in Local Storage
    dispatch(storeUserLocal(updatedUser))
    toastr.success("Event Attended", "Event Verification Successful")
    dispatch(scanQrCodeSuccess(hash))
    navigate("/")
  } catch (error) {
    dispatch(scanQrCodeFailure(error))
    if (scannerRef.current) scannerRef.current.start()
    console.log("Error Uploading Qr Code Data", error)
  }
}
