import { useEffect, useState } from "react"
import { LOCAL_STORAGE } from "../../config/localStorage"
import "./demoDayPage.css"
import Photo1 from "./photo1.jpg"
import Photo2 from "./photo2.jpg"
import { USER_ROLES } from "../../config/helper"
import { DemoDayEventDetails } from "../DemoDay/createDemoDaySlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { fetchDemoDayEvents } from "./demoDayEventListSlice"
import EventCard from "../eventsList/EventCard"
import { EventDetails } from "../manageEvent/manageEventSlice"

export default function DemodaypageComponant() {
  const [userRole, setIsAdmin] = useState(LOCAL_STORAGE.getUserRole())
  const [demoDayEvents, setDemoDayEvents] = useState<DemoDayEventDetails[]>()
  const dispatch = useAppDispatch()
  const demoDayEventList = useAppSelector(state=>state.demoDayEventList)

  useEffect(() => {
    dispatch(fetchDemoDayEvents())
  }, [])

  return (
    <body>
      <header>
        <div className="company-logo">Qwin</div>
        <nav className="navbar1">
          <ul className="nav-items">
            {userRole === USER_ROLES.Student ? (
              <li className="nav-item">
                <a href="/dempday-create-project" className="nav-link">
                  Submit Project
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a href="/demoday-choose-project" className="nav-link">
                    View Projects
                  </a>
                </li>
              </>
            )}
            {userRole === USER_ROLES.Admin ? (
              <li className="nav-item">
                <a href="/create-demo-day-event" className="nav-link">
                  Create DemoDay Event
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
        <div className="menu-toggle">
          <i className="bx bx-menu"></i>
          <i className="bx bx-x"></i>
        </div>
      </header>
      <main>
        <section className="container section-1">
          <div className="slogan">
            <h1 className="company-title">UNIVERSITY OF WINDSOR </h1>
            <h2 className="company-slogan">The biggest computer science event in the area.</h2>
          </div>
          <div className="home-computer-container">
            <img className="home-computer home-img" src={Photo1} alt="a computer in dark with shadow" />
          </div>
        </section>

        <section className="container section-2">
          <div className="offer offer-1">
            <img src={Photo2} alt="a computer in dark with with white shadow" className="offer-img offer-1-img" />
            <div className="offer-description offer-desc-1">
              <h2 className="offer-title">Macbook pro</h2>
              <p className="offer-hook">This a Macbook pro nulla vulputate magna vel odio sagittis bibendium...</p>
              <div className="cart-btn">ADD TO CART</div>
            </div>
          </div>
          <div className="offer offer-2">
            <img
              src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/offer_2.png?raw=true"
              alt="a opened computer"
              className="offer-img offer-2-img"
            />
            <div className="offer-description offer-desc-2">
              <h2 className="offer-title">Lenovo</h2>
              <p className="offer-hook">This a Lenovo nulla vulputate magna vel odio sagittis bibendium...</p>
              <div className="cart-btn">ADD TO CART</div>
            </div>
          </div>
        </section>
        <section>
          
          {demoDayEventList?.length ? (
            demoDayEventList.map((event) => (
              <div key={event.id}>
                <EventCard event={event as EventDetails} />
              </div>
            ))
          ) : (
            <h1>No Registered Events</h1>
          )}
          
        </section>

        <section className="container section-5">
          <h2 className="subscribe-input-label">Demo Day</h2>
        </section>
      </main>
      <footer>
        <div className="container top-footer">
          <div className="footer-item">
            <h2 className="footer-title">ADDRESS</h2>
            <div className="footer-items">
              <h3>300 Ouellette Ave</h3>
            </div>
          </div>
          <div className="footer-item">
            <h2 className="footer-title">SERVICES</h2>
            <div className="footer-items">
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
            </div>
          </div>
          <div className="footer-item">
            <h2 className="footer-title">SUPPLIERS</h2>
            <div className="footer-items">
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
            </div>
          </div>
          <div className="footer-item">
            <h2 className="footer-title">INVESTMENT</h2>
            <div className="footer-items">
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
              <h3>Adipisicing elit.</h3>
            </div>
          </div>
        </div>
        <div className="container end-footer">
          <div className="copyright">
            Copyright © 2023 - Present • <b>Qwin</b>
          </div>
          <a className="designer" href="#">
            University of Windsor
          </a>
        </div>
      </footer>
    </body>
  )
}
