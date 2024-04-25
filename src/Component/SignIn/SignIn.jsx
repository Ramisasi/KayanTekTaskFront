import React, { useEffect, useLayoutEffect, useState } from "react";
import SignInStyle from "./SignIn.module.css";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import { conIp } from "../../connection";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);

  const [UserData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const addUserData = (event) => {
    const user = { ...UserData };
    user[event.name] = event.value;
    setUserData(user);
  };
  const saveUser = async (e) => {
    if (UserData.userName == "") nameError(false);
    else if (UserData.password == "") passwordError(false);
    else {
      nameError(true);
      passwordError(true);
      await axios
        .post(`${conIp}/test/v1/aut/loginUser`, UserData)
        .then((result) => {
          if (result?.data?.message == "don") {
            localStorage.setItem("userToken", result.data.token);
            dispatch(setUser());
            navigate("/");
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == "in-valid user name") {
            $("#alertDanger").removeClass("d-none");
            $("#alertDanger").addClass("d-block");

            $("#alertWarning").addClass("d-none");
            $("#alertWarning").removeClass("d-block");
          } else {
            $("#alertWarning").removeClass("d-none");
            $("#alertWarning").addClass("d-block");

            $("#alertDanger").addClass("d-none");
            $("#alertDanger").removeClass("d-block");
          }
        });
    }
  };
  const nameError = (state) => {
    if (state) $("#userName").removeClass("is-invalid");
    else $("#userName").addClass("is-invalid");
  };
  const passwordError = (state) => {
    if (state) $("#password").removeClass("is-invalid");
    else $("#password").addClass("is-invalid");
  };
  const keyState = (e) => {
    if (e.code == "Backspace") {
      const user = { ...UserData };
      user[e.target.name] = "";
      setUserData(user);
    } else if (e.code == "Enter") {
      if (e.target.name == "userName") $("#password").trigger("focus");
      else if (e.target.name == "password") $("#addButton").trigger("focus");
    }
  };
  const moverAlert = () => {
    $("#alertDanger").addClass("d-none");
    $("#alertWarning").addClass("d-none");
  };
  const signUpCustomer=()=>{
    navigate("/CustomerSignUp");
  }
  useLayoutEffect(() => {
    dispatch(setUser());
    if (isLogin) navigate("/");
  }, []);
  return (
    <>
      <div className={SignInStyle.SignInBackground}>
        <div className={SignInStyle.signInForm}>
          <div className={SignInStyle.Title}>
            <h3>تسجيل الدخول</h3>
          </div>

          <div className={SignInStyle.inputDiv}>
            <div className="mb-3">
              <label htmlFor="basic-url" className="form-label">
                الإسم
              </label>
              <div className="input-group">
                <input
                  name="userName"
                  type="text"
                  className="form-control"
                  id="userName"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => addUserData(e.target)}
                  onKeyDown={(e) => keyState(e)}
                  onMouseDown={() => moverAlert()}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="basic-url" className="form-label">
                الرقم السري
              </label>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => addUserData(e.target)}
                  onKeyDown={(e) => keyState(e)}
                  onMouseDown={() => moverAlert()}
                />
              </div>
            </div>
          </div>
          <div
            className="alert alert-danger d-none"
            id="alertDanger"
            role="alert"
          >
            معلومات خاطئة
          </div>
          <div
            className="alert alert-warning d-none"
            id="alertWarning"
            role="alert"
          >
            الرقم السري غير صحيح
          </div>
          <div className="pb-4">
            <button
              id="addButton"
              onClick={() => saveUser()}
              className="btn btn-success"
            >
              دخـــــــــول
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
