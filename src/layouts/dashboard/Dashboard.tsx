import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Header from "../header/Header"
import "./dashboard.css"
import { getAllUsers } from "./dashboardSlice"

export default function Dashboard() {
  const users = useAppSelector((state) => state.dashboard.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  console.table(users)

  return (
    <React.Fragment>
      <Header />
      <div style={{ overflowX: "auto", overflowY: "scroll", maxHeight: "85vh", marginTop: "5em" }}>
        {users ? (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Student ID</th> 
                <th>Email</th>
                <th>Total Workshops</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.email + user.userID + index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.studentID}</td>
                  <td>{user.email}</td>
                  <td>{user.user_events ? user.user_events.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ padding: "2em", left: "50%" }}>No User Found</h1>
        )}
      </div>
    </React.Fragment>
  )
}
