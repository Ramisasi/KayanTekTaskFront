import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavBarStyle from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/UserData";
import axios from "axios";
import { conIp } from "../../connection";

export default function NavBar() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutUser = () => {
    axios
      .get(`${conIp}/api/v1/aut/signOut`, {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        localStorage.removeItem("userToken");
        dispatch(logOut());
        navigate("/SignIn");
      })
      .catch((err) => {
        navigate("/Home");
      });
  };
  return (
    <>
      <nav className="navbar bg-white navbar-expand-lg">
        <div className={NavBarStyle.container}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="Home"
                  >
                    الرئيسية
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="UsersStatus"
                  >
                    حالة المستخدمين
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="SignUP">
                    المستخدمين
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="Setting">
                    الإعدادات
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className={`nav-link ${NavBarStyle.logOut}`}
                    aria-current="page"
                    to="SignUP"
                    onClick={() => logOutUser()}
                  >
                    تسجيل خروج
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className={NavBarStyle.logo}>
            <Link className="navbar-brand " to="Home">
            </Link>
          </div> */}
        </div>
      </nav>
    </>
  );
}
