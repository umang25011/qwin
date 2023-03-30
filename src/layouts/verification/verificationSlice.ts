import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import {
  FIREBASE_COLLECTIONS,
  generateRandomCharacters,
  getVerificationString,
  TIME_QR_CODE_REFRESHES,
} from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch, store } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"

export interface VerificationDetails {
  hash: string
  randomString: string
  event: EventDetails
}
export const initialVerificationDetails: VerificationDetails = {
  hash: "",
  randomString: "",
  event: ("" as unknown) as EventDetails, // this field will never be empty, there has to an event to order to take attendance
}

export const startVerificationHashStrings = (
  state: VerificationDetails,
  intervalHandle: React.MutableRefObject<NodeJS.Timer | undefined>
) => async (dispatch: AppDispatch) => {
  // TODO : store initial time on firebase, so we can verify later from this time onwards

  const start = async () => {
    const hash = await getVerificationString(state.event.id, state.randomString)
    dispatch(storeHash({ hash: hash }))
    console.log("Hash: ", hash)
  }
  start()

  intervalHandle.current = setInterval(async () => {
    start()
  }, TIME_QR_CODE_REFRESHES)
}

export const generateRandomString = (event: EventDetails) => async (dispatch: AppDispatch) => {
  try {
    const eventRef = await doc(firestoreV9, FIREBASE_COLLECTIONS.events, event.id)
    const privateCollectionRef = await doc(
      eventRef,
      FIREBASE_COLLECTIONS.eventsPrivate,
      FIREBASE_COLLECTIONS.eventsPrivateRandomStringDocument
    )

    const privateDataSnap = await getDoc(privateCollectionRef)
    console.log(privateDataSnap.data())
    if (privateDataSnap.exists()) {
      dispatch(
        storeRandomString({
          randomString: privateDataSnap.data()[FIREBASE_COLLECTIONS.eventsPrivateRandomStringDocument],
        })
      )
      console.log("Random Key Already Generated")
    } else {
      const randomString = generateRandomCharacters()
      console.log("Random String:", randomString)
      try {
        await setDoc(privateCollectionRef, { [FIREBASE_COLLECTIONS.eventsPrivateRandomStringDocument]: randomString })
        dispatch(storeRandomString({ randomString: randomString }))
        console.log("Uploaded")
      } catch (error) {
        console.log("Error Uploading Key:", error)
      }
    }
  } catch (e) {
    console.log("Error Finding Private Data: ", e)
  }
}

export const verificationSlice = createSlice({
  name: "Attadance Slice",
  initialState: initialVerificationDetails,
  reducers: {
    storeRandomString: (state, action: PayloadAction<{ randomString: string }>) => {
      state.randomString = action.payload.randomString
    },
    storeHash: (state, action: PayloadAction<{ hash: string }>) => {
      state.hash = action.payload.hash
    },
    storeEvent: (state, action: PayloadAction<{ event: EventDetails }>) => {
      console.log("Redux Event: ", action.payload.event)

      state.event = { ...action.payload.event }
    },
  },
})

export const { storeRandomString, storeEvent, storeHash } = verificationSlice.actions

export default verificationSlice.reducer
