import React, { useEffect, useState } from "react"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { useAppSelector } from "../../store/store"
import EventCard from "../eventsList/EventCard"
import EventList from "../eventsList/EventsList"
import Header from "../header/Header"
import "./userHomePage.css"
import { isAdmin } from "../../config/localStorage"

export default function UserHomePage() {
  const [selectedView, setSeletectedView] = useState<"event" | "myEvent">("event")
  const user = useAppSelector((state) => state.login)

  useEffect(() => {}, [])
  return (
    <div>
      <Header />
      {isAdmin() ? null : (
        <div className="button-container">
          <button
            id={`upcoming-events-btn`}
            className={`${selectedView === "event" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("event")}
          >
            Events
          </button>
          <div className="separator"></div>
          <button
            id={`my-events-btn`}
            className={`${selectedView === "myEvent" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("myEvent")}
          >
            My Bookings
          </button>
        </div>
      )}

      <div id="event-list-container">
        {selectedView === "event" ? (
          <ul id="upcoming-events-list">
            <EventList />
          </ul>
        ) : (
          <div className="event-list">
            <ul id="my-events-list">
              {user.user_events ? (
                user.user_events.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} />
                  </li>
                ))
              ) : (
                <h1>No Registered Events</h1>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
