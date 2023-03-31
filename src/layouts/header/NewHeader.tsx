import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { LOCAL_STORAGE } from "../../config/localStorage"

export default function NewHeader() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(LOCAL_STORAGE.isAdmin())

  return (
    <div className="container-fluid g-sidenav-show">
      <CheckIfAdmin />
      <div
        className="page-header h-50 border-radius-xl mt-4"
        style={{ backgroundImage: require("../../assets/qwin-logo.jpg"), backgroundPositionY: "50%", height: "1em" }}
      >
        <span
          className="mask bg-gradient-primary opacity-6"
          style={{ backgroundImage: "linear-gradient(310deg,#01357f,#a1c4dd)" }}
        ></span>
      </div>
      <div
        className="card card-body shadow-blur mt-n2 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(310deg,#156caa,#01002a)" }}
      >
        <div className="row gx-4">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <img
                src={require("../../assets/qwin-logo.jpg")}
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1 color-white-imp" style={{ fontSize: "2em" }}>
                Qwin
              </h5>
              <p className="mb-0 font-weight-bold text-sm">By Quent</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1 bg-transparent">

                <li className="nav-item">
                  <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/")}>
                    <i className="fa-solid fa-list alink color-white-imp"></i>
                    <span className="ms-1 color-white-imp">Events</span>
                  </span>
                </li>

                {isAdmin ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/create-event")}>
                      <i className="fa-solid fa-plus alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Create</span>
                    </span>
                  </li>
                ) : null}
                {isAdmin ? null : (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/qr-scanner")}>
                      <i className="fa-solid navbar-icon fa-qrcode alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Scan QR</span>
                    </span>
                  </li>
                )}
                {isAdmin ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink active" onClick={() => navigate("/dashboard")}>
                      <i className="fa-solid navbar-icon fa-table alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Dashboard</span>
                    </span>
                  </li>
                ) : (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink active" onClick={() => navigate("/profile")}>
                      <i className="fa-regular navbar-icon fa-user text-reset alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Profile</span>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
