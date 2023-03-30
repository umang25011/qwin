import React, { useState, useCallback, useEffect, useRef, DetailedHTMLProps, VideoHTMLAttributes } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import QrScannerLibrary from "qr-scanner"
// @ts-ignore
import QrReader from "react-qr-scanner"
import { uploadVerificationToEvent } from "./qrScannerSlice"
import { decryptJson, encryptJson } from "../../config/helper"
import QrScanner from "qr-scanner"
import { UserDetails } from "../profile/profileSlice"
import { useNavigate } from "react-router-dom"
import { toastr } from "react-redux-toastr"

export default function QrScan() {
  const [result, setResult] = useState("")
  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLVideoElement>(null)
  const user = useAppSelector((state) => state.login)
  const navigate = useNavigate()

  const test = async () => {
    // Generate a random 256-bit AES encryption key
    const key = await crypto.subtle.generateKey(
      { name: "AES-CBC", length: 256 },
      true, // exportable
      ["encrypt", "decrypt"]
    )

    // Example JSON object to encrypt
    const plainJson = { foo: "bar", baz: 123 }

    // Encrypt the JSON object
    const encryptedJson = await encryptJson(plainJson, key)

    console.log("Encrypted JSON:", encryptedJson)
    console.log("Key:", key)

    // Decrypt the encrypted JSON object
    const decryptedJson = await decryptJson(encryptedJson, key)

    console.log("Decrypted JSON:", decryptedJson)
  }
  const handleScan = (result: QrScanner.ScanResult) => {
    console.log("QR Result", result)
    try {
      const parsedData = JSON.parse(result.data)
      console.log("User before QR Upload: ", user)

      if (parsedData.hash && parsedData.eventID) {
        if (scannerRef.current) scannerRef.current.stop()

        // check if event is already scanned, or not registred
        const isEventRegistered = user.user_events.map((item) => item.id).includes(parsedData.eventID)
        const isEventAttended = user.events_attended.map((item) => item.eventID).includes(parsedData.eventID)

        if (isEventAttended) {
          toastr.warning("Event Already Attended", "You have already attended this event")
          scannerRef.current!.destroy()
          navigate("/")
          return
        }
        if (!isEventRegistered) {
          toastr.error("Event Not Registered", "You have not registered this event")
          scannerRef.current!.destroy()
          navigate("/")
          return
        }

        dispatch(uploadVerificationToEvent(parsedData.hash, parsedData.eventID, user, scannerRef, navigate))
      }
    } catch (error) {
      console.log("Error Scanning QR Code")
    }
  }

  const handleError = (error: any) => {
    console.error(error)
  }

  const scannerRef = useRef<QrScanner>()

  useEffect(() => {
    // test()
    scannerRef.current = new QrScannerLibrary(videoRef.current!, handleScan, {
      onDecodeError: handleError,
      preferredCamera: "environment",
      maxScansPerSecond: 1,
      highlightScanRegion: true,
      highlightCodeOutline: true,
    })
    scannerRef.current.start()

    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy()
      }
    }
  }, [user])
  console.log("User", user)

  return <video id="qr-video" style={{ objectFit: "cover", width: "100%", height: "100%" }} ref={videoRef} />
}
