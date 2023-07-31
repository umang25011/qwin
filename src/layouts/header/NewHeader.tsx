import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LOCAL_STORAGE } from "../../config/localStorage"
import { USER_ROLES } from "../../config/helper"

export default function NewHeader() {
  const navigate = useNavigate()
  const [userRole, setIsAdmin] = useState(LOCAL_STORAGE.getUserRole())
  console.log("User Role: ", userRole);
  
  return (
    <div className="container-fluid g-sidenav-show">
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
          <div className="col-lg-9 col-md-9 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1 bg-transparent">
                {userRole === USER_ROLES.Professor || userRole === USER_ROLES.Admin ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/demoday-page")}>
                      <i className="fa-solid fa-id-card alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">DemoDay</span>
                    </span>
                  </li>
                ) : null}

                {userRole === USER_ROLES.Student ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/demoday-page")}>
                      <i className="fa-solid fa-id-card alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">DemoDay</span>
                    </span>
                  </li>
                ) : null}

                <li className="nav-item">
                  <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/")}>
                    <i className="fa-solid fa-list alink color-white-imp"></i>
                    <span className="ms-1 color-white-imp">Events</span>
                  </span>
                </li>

                {userRole === USER_ROLES.Admin ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/create-event")}>
                      <i className="fa-solid fa-plus alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Create</span>
                    </span>
                  </li>
                ) : null}
                {userRole === USER_ROLES.Student ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink" onClick={() => navigate("/qr-scanner")}>
                      <i className="fa-solid navbar-icon fa-qrcode alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Scan QR</span>
                    </span>
                  </li>
                ) : null}
                {userRole === USER_ROLES.Admin ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink active" onClick={() => navigate("/dashboard")}>
                      <i className="fa-solid navbar-icon fa-table alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Dashboard</span>
                    </span>
                  </li>
                ) : userRole === USER_ROLES.Student ? (
                  <li className="nav-item">
                    <span className="nav-link mb-0 px-0 py-1 alink active" onClick={() => navigate("/profile")}>
                      <i className="fa-regular navbar-icon fa-user text-reset alink color-white-imp"></i>
                      <span className="ms-1 color-white-imp">Profile</span>
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
