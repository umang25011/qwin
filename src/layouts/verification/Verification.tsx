import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { generateRandomString, startVerificationHashStrings, storeEvent } from "./verificationSlice"
import { getVerificationString } from "../../config/helper"
import QRCode from "react-qr-code"
import "./QRCode.css"
import Header from "../header/Header"

export default function Verification() {
  const { state } = useLocation()
  //   const event: EventDetails = state
  const dispatch = useAppDispatch()
  const isFirstRender = useRef()
  const verificationData = useAppSelector((state) => state.verification)
  // set the interval handle here, so when the component closes, we can clear out the interval
  const intervalRef = useRef<NodeJS.Timer>()
  const navigate = useNavigate()

  useEffect(() => {
    // TODO : call the function the first time also
    if (verificationData) dispatch(startVerificationHashStrings(verificationData, intervalRef))

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [verificationData])

  useEffect(() => {
    // React 18 update. Reference: https://dev.to/jherr/react-18-useeffect-double-call-for-apis-emergency-fix-27ee
    if (state) dispatch(storeEvent({ event: state }))
    else navigate("/events")
  }, [state])
  return (
    <React.Fragment>
      <Header />
      <strong className="fa-xl" style={{ display: "flex", justifyContent: "space-evenly", whiteSpace:"nowrap" }}>
        <span>Open Qwin </span>
        {"--->"}
        <span>Tap QR Icon </span>
        {"--->"}
        <span> Scan This</span>
      </strong>
      <div className="qr-code-container">
        <QRCode
          value={JSON.stringify({ eventID: verificationData.event.id, hash: verificationData.hash })}
          size={256}
        />
      </div>
    </React.Fragment>
  )
}
