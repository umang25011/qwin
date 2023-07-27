import React, { useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import NewHeader from "../header/NewHeader"
import "./QRCode.css"
import { startVerificationHashStrings, storeEvent } from "./verificationSlice"

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
    if (verificationData) dispatch(startVerificationHashStrings(verificationData, intervalRef))

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [])

  useEffect(() => {
    // React 18 update. Reference: https://dev.to/jherr/react-18-useeffect-double-call-for-apis-emergency-fix-27ee
    if (state) dispatch(storeEvent({ event: state }))
    else navigate("/")
  }, [state])
  return (
    <React.Fragment>
      <NewHeader />
      <div className="qr-code-container">
        <QRCode
          value={JSON.stringify({ eventID: verificationData.event.id, hash: verificationData.hash })}
          size={256}
        />
      </div>
    </React.Fragment>
  )
}
