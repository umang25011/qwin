import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DATE_FORMAT_OPTION, USER_ROLES } from "../../config/helper"
import { getUserRole } from "../../config/localStorage"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { registerEvent, unregisterEvent } from "./demoDayEventListSlice"

export default function DemoDayEventCard({ event }: { event: EventDetails }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.login)
  const userRole = getUserRole()
  const isEventRegistered = user.user_events ? user.user_events.map((item) => item.id).includes(event.id) : false
  const isEventAttended = user.events_attended
    ? user.events_attended.map((item) => item.eventID).includes(event.id)
    : false

  const [isExpanded, setIsExpanded] = useState("")

  return (
    <>
      <div className="card card-blog card-plain">
        <div className={`${event.isExpired ? "" : ""}card-body px-1 pb-0`}>
          {/* <p className="text-gradient text-dark mb-2 text-sm">Project #2</p> */}
          <h5>{event.title}</h5>
          <p className="mb-4 text-sm">{new Date(event.date).toLocaleString("en-US", DATE_FORMAT_OPTION)}</p>
          <p className="mb-4 text-sm">{event.address}</p>
          <div className="d-flex align-items-center justify-content-between">
            {userRole === USER_ROLES.Admin ? (
              <span
                className="btn btn-outline-dark btn-dark btn-sm mb-0"
                onClick={() => {
                  navigate("/create-demo-day-event/" + event.id)
                }}
              >
                Edit Details
              </span>
            ) : userRole === USER_ROLES.Student ? (
              <span
                className="btn btn-outline-dark btn-dark btn-sm mb-0"
                data-bs-toggle="modal"
                data-bs-target={"#modal-default" + event.id}
                data-backdrop="false"
                onClick={() => {
                  setIsExpanded(event.id)
                }}
              >
                View Details
              </span>
            ) : null}

            {userRole === USER_ROLES.Admin ? (
              <button
                className="btn btn-info btn-sm mb-0"
                onClick={(e) => {
                  navigate("/start-verification", { state: event })
                }}
              >
                Start QR
              </button>
            ) : userRole === USER_ROLES.Student ? (
              <button
                className={`btn btn-sm mb-0 ${isEventAttended ? "btn-outline-dark btn-white" : ""}
              ${event.isExpired ? "btn-outline-dark" : ""}
              ${isEventRegistered ? "btn-outline-danger" : "btn-outline-success"}`}
                disabled={isEventAttended || event.isExpired}
                onClick={(e) => {
                  if (isEventRegistered) {
                    console.log("Calling Unregister")
                    dispatch(unregisterEvent(event, user))
                  } else {
                    console.log("Calling Register")
                    dispatch(registerEvent(event, user))
                  }
                }}
              >
                {isEventAttended ? "Attended" : event.isExpired ? "Expired" : isEventRegistered ? "Cancel" : "Register"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="modal"
        style={isExpanded === event.id ? { visibility: "visible", backgroundColor: "rgba(0,0,0,0.6)" } : { visibility: "hidden" }}
        id={"modal-default" + event.id}
        tabIndex={-1}
        aria-labelledby={"modal-default" + event.id}
      >
        <div className="modal-dialog modal modal-dialog-centered modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                {event.title}
              </h6>
              <button
                onClick={() => setIsExpanded("")}
                type="button"
                className="btn-close text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{event.description}</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setIsExpanded("")}
                type="button"
                className="btn btn-link  ml-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
