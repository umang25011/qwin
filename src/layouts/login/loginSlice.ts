import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAuth, getRedirectResult, signInWithPopup } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import * as firebase from "firebase/compat/app"
import { setLoading } from "../../config/commonSlice"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestore, firestoreV9, microsoftProvider } from "../../config/IntialiseFirebase"
import { LOCAL_STORAGE } from "../../config/localStorage"
import { AppDispatch } from "../../store/store"
import { initialUserProfile, UserDetails } from "../profile/profileSlice"

const initialState: UserDetails = initialUserProfile

export const getUserFromFirestore = (userID: string) => async (dispatch: AppDispatch) => {
  try {
    console.log("Get User Called")

    const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, userID)
    const userSnap = await getDoc(userRef)
    console.log("From Firebase User", userSnap.data())
    const data = userSnap.data()
    if (data) {
      const user: UserDetails = {
        name: data.name,
        email: data.email,
        mobileNo: data.mobileNo,
        studentID: data.studentID,
        program: data.program,
        events_attended: data.events_attended,
        user_events: data.user_events,
        userID: data.userID,
      }
      dispatch(storeUserLocal(user))
      window.location.href = "/"
    } else throw Error("User Not Found")
  } catch (error) {
    console.log("Error Getting User From Firestore", error)
    throw error
  }
}

export const handleLoginFlow = () => async (dispatch: AppDispatch) => {
  // check if loading
  const isLoading = LOCAL_STORAGE.isLoading()
  if (isLoading) dispatch(setLoading(true))

  // validate user object
  const auth = getAuth()
  const redirectResult = await signInWithPopup(auth, microsoftProvider)
  if (redirectResult) {
    const user: UserDetails = { ...initialUserProfile }
    user.name = redirectResult.user.displayName || ""
    user.email = redirectResult.user.email || ""
    user.userID = redirectResult.user.uid
    try {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.
      // Get the OAuth access token and ID Token

      console.log("Login Flow")
      if (user.name && user.email && user.userID) {
        // get the user from firebase, if error, then create new
        await dispatch(getUserFromFirestore(user.userID))
        dispatch(setLoading(false))
      }
    } catch (error) {
      console.log("Creating New User")

      firestore
        .collection("users")
        .doc(user.userID)
        .set(
          {
            name: user.name,
            createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
            email: user.email,
            userID: user.userID,
          },
          { merge: true }
        )
        .then((res) => {
          dispatch(storeUserLocal(user))
          dispatch(setLoading(false))
          window.location.href = "/profile"
        })
    }
  }
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginWithMicrosoft: (state) => {},
    loginError: (state) => {
      // Login Failed
    },
    loginSuccess: (state) => {
      // Login Successful
    },
    storeUser: (state, action: PayloadAction<undefined | UserDetails>) => {
      if (action.payload) {
        state = action.payload
        console.log(action.payload)

        firestore
          .collection("users")
          .doc(action.payload.userID)
          .set(action.payload, { merge: true })
          .then((res) => {
            window.location.href = "/"
          })
      }
      LOCAL_STORAGE.storeUser(state)
    },
    storeUserLocal: (state, action: PayloadAction<UserDetails>) => {
      LOCAL_STORAGE.storeUser(action.payload)
      state = action.payload
      return { ...state }
    },
    getUserLocal: (state) => {
      const user = LOCAL_STORAGE.getUser()
      if (user) {
        return { ...user }
      }
    },
    getUserFirebase: (state, action: PayloadAction<{ userID: string }>) => {},
  },
})

export const {
  loginError,
  loginSuccess,
  loginWithMicrosoft,
  storeUser,
  getUserLocal,
  storeUserLocal,
} = loginSlice.actions

export default loginSlice.reducer
