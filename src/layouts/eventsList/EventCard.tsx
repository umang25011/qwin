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

    <div className="card card-blog card-plain">
      <div className="position-relative">
        <a className="d-block shadow-xl border-radius-xl">
          <img
            src={require("../../assets/img/home-decor-1.jpg")}
            alt="img-blur-shadow"
            className="img-fluid shadow border-radius-xl"
          />
        </a>
      </div>
      <div className="card-body px-1 pb-0">
        <p className="text-gradient text-dark mb-2 text-sm">Project #2</p>
        <a href="javascript:;">
          <h5>Modern</h5>
        </a>
        <p className="mb-4 text-sm">As Uber works through a huge amount of internal management turmoil.</p>
        <div className="d-flex align-items-center justify-content-between">
          <button type="button" className="btn btn-outline-primary btn-sm mb-0">
            View Project
          </button>
          <div className="avatar-group mt-2"></div>
        </div>
      </div>
    </div>
  )
}
