import React, { useState } from "react"
import { useEffect } from "react"
import { redirect } from "react-router-dom"
// import { Card, Dropdown, Form } from "semantic-ui-react"
import { SelectOption, TextInput } from "../../config/FormComponents"
import { store, useAppDispatch, useAppSelector } from "../../store/store"
import Header from "../header/Header"
import { getUserLocal, storeUser } from "../login/loginSlice"
import { initialUserProfile, UserDetails } from "./profileSlice"
import "./profile.css"
import NewHeader from "../header/NewHeader"
import UsersTable from "../manageEvent/UsersTable"
import EventCard from "../eventsList/EventCard"

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
      <NewHeader />
      <div>
        <div className="mt-3 user-profile-card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              dispatch(storeUser(user))
            }}
          >
            <div style={{ display: "flex", gap: "10em", height: "auto", marginTop: "1em" }}>
              <div className="user-profile-inner-card-body">
                <h2 className="mb-3">User Profile</h2>

                <form
                  className="user-profile-mb-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(storeUser(user))
                  }}
                >
                  <label htmlFor="disabled-name" className="user-profile-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="disabled-name"
                    name="disabled-name"
                    value={user.name}
                    disabled
                  />
                </form>
                <div className="mb-3">
                  <label htmlFor="disabled-email" className="user-profile-form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="disabled-email"
                    name="disabled-email"
                    value={user.email}
                    disabled
                  />
                </div>
                <div className="user-profile-mb-3">
                  <label htmlFor="student-id" className="user-profile-form-label">
                    Student ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="student-id"
                    name="student-id"
                    value={user.studentID}
                    onChange={(e) => setUser({ ...user, studentID: e.target.value })}
                    pattern={"[0-9]{9}"}
                    maxLength={9}
                    required
                    onInvalid={(e) =>
                      //@ts-ignore
                      e.target.setCustomValidity("Please Enter Your 9 Digit Student ID (e.g 123456789)")
                    }
                    //@ts-ignore
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>
                <div className="user-profile-mb-3">
                  <label htmlFor="mobile-no" className="user-profile-form-label">
                    Phone No:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile-no"
                    name="mobile-no"
                    value={user.mobileNo}
                    onChange={(e) => setUser({ ...user, mobileNo: e.target.value })}
                    pattern={"[0-9]{10}"}
                    maxLength={10}
                    required
                    onInvalid={(e) =>
                      // @ts-ignore
                      e.target.setCustomValidity("Please Enter Your 10 Digit Mobile No. (e.g 9998887777)")
                    }
                    // @ts-ignore
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="program" className="user-profile-form-label">
                    Program:
                  </label>
                  <select
                    className="form-select"
                    required
                    id="program"
                    name="program"
                    value={user.program}
                    onChange={(e) => setUser({ ...user, program: e.target.value })}
                  >
                    <option value="">Select Program</option>
                    <option value="MAC Summer 22">MAC - Summer 22</option>
                    <option value="MAC Fall 22">MAC - Fall 22</option>
                    <option value="MAC Winter 23">MAC - Winter 23</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div className="button-group">
                  <button
                    type="submit"
                    className="create-button btn bg-gradient-dark w-100 my-4 mb-2"
                    // className="user-profile-btn bg-gradient-dark w-100 my-4 mb-2"
                    style={{ marginTop: "3em" }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <h2 className="mt-4">My Bookings ({user.user_events.length})</h2>
                <div className="container-fluid py-4">
                  <div className="row">
                    {user.user_events?.length ? (
                      user.user_events.map((event) => (
                        <div className="col-lg-3 mt-4" key={event.id}>
                          <div className="card mb-4">
                            <div className="card-body p-3">
                              <div className="col-12 mb-xl-0 mb-4">
                                <EventCard event={event} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1>No Registered Events</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
