import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "./eventsListSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import EventCard from "./EventCard"
import { EventDetails } from "../manageEvent/manageEventSlice"
import firebase from "firebase/compat"
import Header from "../header/Header"
import { getUserFromFirestore } from "../login/loginSlice"

const EventList = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector((state) => state.eventsList)
  const user = useAppSelector((state) => state.login)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    // <React.Fragment>
    //   <div className="event-list">
    //     <h1>Upcoming Events</h1>
    //     {events && events.length === 0 && <p>No events found.</p>}
    //     <ul>
    //       {events
    //         ? events.map((event) => (
    //             <li key={event.id}>
    //               <EventCard event={event as EventDetails} />
    //             </li>
    //           ))
    //         : null}
    //     </ul>
    //   </div>
    // </React.Fragment>
    <div className="g-sidenav-show">
      <div className="main-content position-relative max-height-vh-100 h-100">
        {events?.length === 0 && <p>No events found.</p>}

        <div className="container-fluid py-4">
          <div className="row">
            {events
              ? events.map((event) => (
                  <div className="col-lg-3 mt-4" key={event.id}>
                    <div className="card mb-4">
                      <div className="card-body p-3">
                        <div className="col-12 mb-xl-0 mb-4">
                          <EventCard event={event as EventDetails} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventList
