import React, { useState } from "react"
import { useEffect } from "react"
import { redirect } from "react-router-dom"
// import { Card, Dropdown, Form } from "semantic-ui-react"
import { SelectOption, TextInput } from "../../config/FormComponents"
import { store, useAppDispatch, useAppSelector } from "../../store/store"
import Header from "../header/Header"
import { getUserLocal, storeUser } from "../login/loginSlice"
import "./profile.css"
import { initialUserProfile, UserDetails } from "./profileSlice"
import "../manageEvent/manageEvent.css"

export default function Profile() {
  const globalUser = useAppSelector((store) => store.login)
  const [user, setUser] = useState<UserDetails>(globalUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserLocal())
  }, [])

  useEffect(() => {
    if (globalUser.email) {
      setUser(globalUser)
    }
    console.log("Global User", globalUser)
  }, [globalUser])

  return (
    <React.Fragment>
      <Header />
      <form
        className="event-form"
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(storeUser(user))
        }}
      >
        {/* <div className="title">Complete User </div> */}
        <div className="subtitle">Profile Details</div>
        <TextInput
          label="Student ID"
          value={user.studentID}
          setValue={(val) => setUser({ ...user, studentID: val })}
          extra={{
            pattern: "[0-9]{9}",
            maxLength: 9,
            required: true,
            // @ts-ignore
            onInvalid: (e) => e.target.setCustomValidity("Please Enter Your 9 Digit Student ID (e.g 123456789)"),
            // @ts-ignore
            onInput: (e) => e.target.setCustomValidity(""),
          }}
        />
        <TextInput
          label="Phone No"
          value={user.mobileNo}
          setValue={(val) => setUser({ ...user, mobileNo: val })}
          extra={{
            pattern: "[0-9]{10}",
            maxLength: 10,
            required: true,
            // @ts-ignore
            onInvalid: (e) => e.target.setCustomValidity("Please Enter Your 10 Digit Mobile No. (e.g 9998887777)"),
            // @ts-ignore
            onInput: (e) => e.target.setCustomValidity(""),
          }}
        />
        <SelectOption setValue={(val) => setUser({ ...user, program: val })} />

        <button className="create-button" type="submit" style={{ marginTop: "3em", width: "100%", padding: "1em" }}>
          Finish
        </button>
      </form>
    </React.Fragment>
  )
}
