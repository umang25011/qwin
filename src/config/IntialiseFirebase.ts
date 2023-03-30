import * as firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
import { firebaseConfig } from "./firebaseConfig"
import { getFirestore } from "firebase/firestore"

const firebaseApp = firebase.default.initializeApp(firebaseConfig)

const firestore = firebase.default.firestore()
const firestoreV9 = getFirestore(firebaseApp)
const auth = firebase.default.auth()
const storage = firebase.default.storage()
const microsoftProvider = new firebase.default.auth.OAuthProvider("microsoft.com")

microsoftProvider.setCustomParameters({
  domain_hint: "uwindsor.ca",
})

export { firebase, firestore, auth, storage, microsoftProvider, firestoreV9 }
