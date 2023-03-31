import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { getEventAttendees } from "./manageEventSlice"

export default function UsersTable(props: { eventID?: string }) {
  const attendees = useAppSelector((state) => state.manageEvent.attendees)
  const attendeed = useAppSelector((state) => state.manageEvent.attendeed)
  const dispatch = useAppDispatch()
  console.log("Local Data:", attendees)

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
