import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Header from "../header/Header"
import NewHeader from "../header/NewHeader"
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
      <NewHeader />
      <div>
        {users ? (
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-12">
                <div className="card mb-4">
                  <div className="card-header pb-0">
                    <h6>Events Attented By Each Student</h6>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No.</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Name
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Student ID
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Email
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Total Workshops
                            </th>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 style={{ padding: "2em", left: "50%" }}>No User Found</h1>
        )}
      </div>
    </React.Fragment>
  )
}
