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
      {attendees ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Attended</th>
            </tr>
          </thead>

          <tbody>
            {attendees.map((user, index) => (
              <tr key={user.email + user.userID + index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {attendeed ? (attendeed.findIndex((item) => item === user.userID) !== -1 ? "Yes" : "No") : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 style={{ padding: "2em", left: "50%" }}>No User Registered</h1>
      )}
    </div>
  )
}
