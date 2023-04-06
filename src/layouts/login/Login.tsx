import React, { useEffect } from "react"
// import { Button, Icon } from "semantic-ui-react"
import { getAuth, getRedirectResult, OAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { microsoftProvider } from "../../config/IntialiseFirebase"
import { handleLoginFlow, loginWithMicrosoft } from "./loginSlice"
import { redirect, useNavigate } from "react-router-dom"
import { url } from "inspector"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Loading from "../../config/Loding"
import { isLoading, LOCAL_STORAGE } from "../../config/localStorage"

export default function Login() {
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.commonData.loading)

  const microsoftLogin = () => {
    // set login true in Local Storage
    LOCAL_STORAGE.isLoading(true)
    dispatch(handleLoginFlow())
  }

  useEffect(() => {}, [])

  return (
    <div className="home">
      {loading ? <Loading /> : null}
      <div className="logo">
        <img src={require("../../assets/logo.png")} alt="University of Windsor" />
      </div>
      {/* <div className="home-qwin-logo">
        <img src={require("../../assets/qwin-logo.jpg")} alt="Qwin Logo" />
      </div> */}
      <div className="home-intro">
        {/* Note <br /> Use Your University Microsoft Account To Login <br /> Please Allow Location Permission */}
      </div>
      {/* <button onClick={microsoftLogin} type="button">
        Login
      </button> */}
      <span className="btn bg-light mt-3" style={{fontSize:"1.5em"}} onClick={microsoftLogin}>
        Login
      </span>
    </div>
  )
}
