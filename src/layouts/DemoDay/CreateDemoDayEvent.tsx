import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import NewHeader from "../header/NewHeader"
import {} from "./CreateProjectFormSlice"
import CSVDownload from "../../config/CSVFileDownload"
import {
  DemoDayEventDetails,
  createEvent,
  deleteEvent,
  getDemoDayEvent,
  initialEventDetails,
  updateEvent,
} from "./createDemoDaySlice"
import DemoDayUsersTable from "./DemoDayUsersTable"

export default function CreateDemoDayEvent() {
  const [event, setEvent] = useState<DemoDayEventDetails>(initialEventDetails)
  const reduxEvent = useAppSelector((state) => state.demoDayDetails)
  const dispatch = useAppDispatch()
  const disableCloseButtonFocus = true
  const { id } = useParams()

  useEffect(() => {
    return () => {
      setEvent(initialEventDetails)
    }
  }, [])
  // fetch details of event from FireBase
  useEffect(() => {
    if (id) {
      dispatch(getDemoDayEvent(id))
    }
  }, [id])

  // update state object from redux
  useEffect(() => {
    if (reduxEvent.id) setEvent(reduxEvent)
    console.log("Redux Event: ", reduxEvent)
  }, [reduxEvent])

  return (
    <div>
      <NewHeader />
      <main style={{ position: "relative", top: "14em" }} className="main-content mt-0">
        <section className="row">
          <div className="col-6">
            <div className="container mb-5">
              <div className="row mt-lg-n10 mt-md-n11 mt-n12">
                <div className="col-12 mx-auto">
                  <div className="card z-index-0">
                    <div>
                      <div className="card-body">
                        <h2>{event?.id ? "Update Demo Day Event" : "Create Demo Day Event"}</h2>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            if (event.id) dispatch(updateEvent(event))
                            else dispatch(createEvent(event))
                          }}
                        >
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Title:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              value={event.title}
                              onChange={(e) => setEvent({ ...event, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Description:
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              name="description"
                              value={event.description}
                              onChange={(e) => setEvent({ ...event, description: e.target.value })}
                              required
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Address:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              value={event.address}
                              onChange={(e) => setEvent({ ...event, address: e.target.value })}
                              required
                            />
                          </div>
                          <div className="row">
                            <div className="mb-3">
                              <label htmlFor="date-time" className="form-label">
                                Date and Time:
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="date-time"
                                value={event.date}
                                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                                name="date-time"
                                required
                              />
                            </div>
                          </div>
                          <div className="button-group">
                            <button
                              type="submit"
                              className="create-button btn bg-gradient-dark w-100 my-4 mb-2"
                              onClick={(e) => {
                                // e.preventDefault()
                                // if (event.id) dispatch(updateEvent(event))
                                // else dispatch(createEvent(event))
                              }}
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="cancel-button btn bg-gradient-danger w-100 my-4 mb-2"
                              onClick={(e) => {
                                dispatch(deleteEvent(event))
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <DemoDayUsersTable eventID={id} csvDownload={true} />
          </div>
        </section>
      </main>
    </div>
  )
}
