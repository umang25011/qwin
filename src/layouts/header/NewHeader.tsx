import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { LOCAL_STORAGE } from "../../config/localStorage"

export default function NewHeader() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(LOCAL_STORAGE.isAdmin())

  return (
    <div className="container-fluid g-sidenav-show bg-gray-100  ">
      <CheckIfAdmin />
      <div
        className="page-header min-height-50 border-radius-xl mt-4"
        style={{ backgroundImage: require("../../assets/qwin-logo.jpg"), backgroundPositionY: "50%" }}
      >
        <span className="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div className="card card-body blur shadow-blur mt-n2 overflow-hidden">
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
              <h5 className="mb-1">Qwin</h5>
              <p className="mb-0 font-weight-bold text-sm">By Quent</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1 bg-transparent">
                <li className="nav-item">
                  <a className="nav-link mb-0 px-0 py-1 active " data-bs-toggle="tab" role="tab" aria-selected="true">
                    <i className="fa-solid fa-plus alink" onClick={() => navigate("/create-event")}></i>
                    <span className="ms-1">Create</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1 "
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <i
                      className="fa-solid navbar-icon fa-qrcode text-reset alink"
                      onClick={() => navigate("/qr-scanner")}
                    ></i>
                    <span className="ms-1">Scan QR</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1 "
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="false"
                  >
                    <i
                      className="fa-regular navbar-icon fa-user text-reset alink"
                      onClick={() => navigate("/profile")}
                    ></i>
                    <span className="ms-1">Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
