import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { LOCAL_STORAGE } from "../../config/localStorage"

export default function Header() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(LOCAL_STORAGE.isAdmin())

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <CheckIfAdmin />
      <div className="navbar-collapse" id="navbarSupportedContent">
        {/* <a className="navbar-brand" href="/">
          <img src={require("../../assets/qwin-logo.jpg")} height="auto" width={"40"} alt="Qwin Logo" />
        </a> */}
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="me-1">
            <a href="/">
              <img src={require("../../assets/qwin-logo.jpg")} height="auto" width={"40"} alt="Qwin Logo" />
            </a>
          </li>
          <li className="nav-item nav-link" style={{ fontSize: "2em" }} onClick={() => navigate("/")}>
            Qwin
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center">
        {isAdmin ? (
          <i className="fa-solid fa-plus fa-2xl me-5 alink" onClick={() => navigate("/create-event")}></i>
        ) : null}
        {isAdmin ? null : (
          <i
            className="fa-solid navbar-icon fa-qrcode fa-2xl text-reset me-5  dropdown-toggle hidden-arrow alink"
            onClick={() => navigate("/qr-scanner")}
          ></i>
        )}
        {isAdmin ? null : (
          <i
            className="fa-regular navbar-icon fa-user text-reset fa-2xl me-3 dropdown-toggle hidden-arrow alink"
            onClick={() => navigate("/profile")}
          ></i>
        )}
        {isAdmin ? (
          <i
            onClick={() => navigate("/dashboard")}
            className="fa-solid navbar-icon fa-table fa-2xl me-3 dropdown-toggle hidden-arrow alink"
          ></i>
        ) : null}
      </div>
    </nav>
  )
}
