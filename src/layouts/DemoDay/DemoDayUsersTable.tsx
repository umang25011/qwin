import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {  } from "./CreateProjectFormSlice"
import CSVDownload from "../../config/CSVFileDownload"
import { Link } from "react-router-dom"
import { CSVLink } from "react-csv"
import { getEventAttendees } from "./createDemoDaySlice"

export default function DemoDayUsersTable(props: { eventID?: string; csvDownload?: boolean }) {
  const attendees = useAppSelector((state) => state.demoDayDetails.attendees)
  const attendeed = useAppSelector((state) => state.demoDayDetails.attendeed)
  const dispatch = useAppDispatch()
  console.log("Local Data:", attendees)
  const csvRef = useRef<any>(null)

  useEffect(() => {
    if (props.eventID) dispatch(getEventAttendees(props.eventID))
  }, [])
  return (
    <div>
      {attendees?.length ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Attendees</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No.</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Attended
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map((user, index) => (
                          <tr key={user.email + user.userID + index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {attendeed
                                ? attendeed.findIndex((item) => item === user.userID) !== -1
                                  ? "Yes"
                                  : "No"
                                : "No"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {props.csvDownload && attendees?.length ? (
                      <button
                        type="button"
                        className="cancel-button btn bg-gradient-success w-95 my-4 mb-2"
                        onClick={(e) => {
                          csvRef.current?.link.click()
                        }}
                      >
                        Download CSV{" "}
                        <CSVDownload
                          csvRef={csvRef}
                          filename="Registered Users"
                          data={[["Student ID", "Name", "Email", "Event Attended"]].concat(
                            attendees.map((user) => [
                              user.studentID || "",
                              user.name,
                              user.email,
                              attendeed
                                ? attendeed.findIndex((item) => item === user.userID) !== -1
                                  ? "Yes"
                                  : "No"
                                : "No",
                            ])
                          )}
                        />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 style={{ padding: "2em", left: "50%" }}>No User Registered</h2>
      )}
    </div>
  )
}
