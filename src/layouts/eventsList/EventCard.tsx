import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DATE_FORMAT_OPTION } from "../../config/helper"
import { isAdmin } from "../../config/localStorage"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { registerEvent, unregisterEvent } from "./eventsListSlice"

export default function EventCard({ event }: { event: EventDetails }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.login)
  const isEventRegistered = user.user_events ? user.user_events.map((item) => item.id).includes(event.id) : false
  const isEventAttended = user.events_attended
    ? user.events_attended.map((item) => item.eventID).includes(event.id)
    : false

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    // <div className={`event-details ${isExpanded ? "show" : ""} mb-5`}>
    //   <h1 className="event-title">{event.title}</h1>
    //   <p className="event-date">{new Date(event.date).toLocaleString("en-US", DATE_FORMAT_OPTION)}</p>
    //   <p className="event-address">{event.address}</p>
    //   {isExpanded ? <div className="event-details-more">{event.description}</div> : null}

    //   <div className="buttons">
    //     <button
    //       className="details-button"
    //       onClick={() => {
    //         if (isAdmin()) navigate("/events/" + event.id)
    //         else setIsExpanded((val) => !val)
    //       }}
    //     >
    //       {isAdmin() ? "Edit" : "Details"}
    //     </button>
    //     {isAdmin() ? (
    //       <button
    //         className="details-button"
    //         onClick={(e) => {
    //           navigate("/start-verification", { state: event })
    //         }}
    //       >
    //         Start Verification
    //       </button>
    //     ) : (
    //       <button
    //         className={`${isEventAttended ? "event-attended-button" : ""} ${
    //           isEventRegistered ? "cancel-button" : "register-button"
    //         }`}
    //         disabled={isEventAttended}
    //         onClick={(e) => {
    //           if (isEventRegistered) {
    //             console.log("Calling Unregister")
    //             dispatch(unregisterEvent(event, user))
    //           } else {
    //             console.log("Calling Register")
    //             dispatch(registerEvent(event, user))
    //           }
    //         }}
    //       >
    //         {isEventAttended ? "Attended" : isEventRegistered ? "Cancel" : "Register"}
    //       </button>
    //     )}
    //   </div>
    // </div>
    <>
      <div className="card card-blog card-plain">
        <div className={`${event.isExpired ? "" : ""}card-body px-1 pb-0`}>
          {/* <p className="text-gradient text-dark mb-2 text-sm">Project #2</p> */}
          <h5>{event.title}</h5>
          <p className="mb-4 text-sm">{new Date(event.date).toLocaleString("en-US", DATE_FORMAT_OPTION)}</p>
          <p className="mb-4 text-sm">{event.address}</p>
          <div className="d-flex align-items-center justify-content-between">
            {isAdmin() ? (
              <span
                className="btn btn-outline-dark btn-dark btn-sm mb-0"
                onClick={() => {
                  navigate("/events/" + event.id)
                }}
              >
                Edit Details
              </span>
            ) : (
              <span
                className="btn btn-outline-dark btn-dark btn-sm mb-0"
                data-bs-toggle="modal"
                data-bs-target={"#modal-default" + event.id}
                data-backdrop="false"
                onClick={() => {
                  setIsExpanded((val) => !val)
                }}
              >
                View Details
              </span>
            )}
            {isAdmin() ? (
              <button
                className="btn btn-info btn-sm mb-0"
                onClick={(e) => {
                  navigate("/start-verification", { state: event })
                }}
              >
                Start QR
              </button>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div
            className="modal fade"
            id={"modal-default" + event.id}
            tabIndex={-1}
            style={{ zIndex: 2000 }}
            role="dialog"
            aria-labelledby={"modal-default" + event.id}
            aria-hidden="true"
          >
            <div className="modal-dialog modal modal-dialog-centered modal" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title" id="modal-title-default">
                    {event.title}
                  </h6>
                  <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{event.description}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-link  ml-auto" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
