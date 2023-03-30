import React, { useEffect, useState } from "react"
import { toastr } from "react-redux-toastr"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Header from "../header/Header"
import "./manageEvent.css"
import {
  deleteEvent,
  EventDetails,
  getEvent,
  initialEventDetails,
  createEvent,
  updateEvent,
  getEventFunction,
} from "./manageEventSlice"
import UsersTable from "./UsersTable"

export default function ManageEvents() {
  const [event, setEvent] = useState<EventDetails>(initialEventDetails)
  const reduxEvent = useAppSelector((state) => state.manageEvent)
  const dispatch = useAppDispatch()
  const disableCloseButtonFocus = true
  const { id } = useParams()

  // fetch details of event from FireBase
  useEffect(() => {
    if (id) {
      dispatch(getEventFunction(id))
    }
  }, [id])

  // update state object from redux
  useEffect(() => {
    if (!event.id && reduxEvent.id) {
      setEvent(reduxEvent)
      console.log("Redux Event: ", reduxEvent)
    }
  }, [reduxEvent])

  return (
    <div>
      <Header />
      <div style={{ display: "flex", gap: "10em", height: "75vh", marginTop: "1em" }}>
        <div className="event-form">
          <h1 className="form-title">Create Event</h1>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={event.address}
                onChange={(e) => setEvent({ ...event, address: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date-time">Date and Time:</label>
              <input
                type="datetime-local"
                id="date-time"
                value={event.date}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                name="date-time"
                required
              />
            </div>
            <div className="button-group">
              <button
                type="submit"
                className="create-button"
                onClick={(e) => {
                  e.preventDefault()
                  if (event.id) dispatch(updateEvent(event))
                  else dispatch(createEvent(event))
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={(e) => {
                  dispatch(deleteEvent(event))
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        <UsersTable eventID={id} />
      </div>
    </div>
  )
}
