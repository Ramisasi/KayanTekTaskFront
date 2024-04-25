import React, { useEffect, useRef, useState } from "react";
import GetAllUser from "../../Hooks/GetAllUser";
import SignUpStyle from "./signUpStyle.module.css";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import $ from "jquery";
import axios from "axios";
import { setUser } from "../../Redux/UserData";
import { useDispatch, useSelector } from "react-redux";
import { conIp } from "../../connection";
export default function SignUP() {
  const { token } = useSelector((stat) => stat.user);
  const [userId, setUserId] = useState();
  const [type, setType] = useState("");
  const [userState, setUserState] = useState(false);
  const [IndexUser, setIndexUser] = useState(null);
  const [UserData, setUserData] = useState({
    userName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const { allUser } = GetAllUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
    closeForm();
  }, [allUser, userState]);
  const closeForm = () => {
    setUserId(0);
    setType("");
    if (userState && IndexUser) {
      allUser.splice(IndexUser, 1);
      setUserState(false);
    }
    if (!userId) {
      $("#updateForm").css("display", "none");
      setIndexUser(null);
    }
  };
  const startUpdate = (id) => {
    setUserId(id);
    setType("update");
    if (userId) $("#updateForm").css("display", "flex");
  };
  const deleteUser = (id, index) => {
    setUserId(id);
    setType("delete");
    setIndexUser(index);
    if (userId) $("#updateForm").css("display", "flex");
  };
  const addUserData = (event) => {
    const user = { ...UserData };
    user[event.name] = event.value;
    setUserData(user);
  };
  const nameError = (state) => {
    if (state) $("#userName").removeClass("is-invalid");
    else $("#userName").addClass("is-invalid");
  };
  const passwordError = (state) => {
    if (state) $("#password").removeClass("is-invalid");
    else $("#password").addClass("is-invalid");
  };
  const confirmPasswordError = (state) => {
    if (state) $("#confirmPassword").removeClass("is-invalid");
    else $("#confirmPassword").addClass("is-invalid");
  };

  const saveUser = async (e) => {
    if (UserData.userName == "") nameError(false);
    else if (UserData.password == "") passwordError(false);
    else if (
      UserData.confirmPassword == "" ||
      UserData.confirmPassword !== UserData.password
    )
      confirmPasswordError(false);
    else {
      nameError(true);
      passwordError(true);
      confirmPasswordError(true);
      await axios
        .post(`${conIp}/test/v1/user/createUser`,UserData, {
          headers: {
            authorization: token,
          },
        })
        .then((result) => {
          $("#alertSuccess").removeClass("d-none");
          $("#alertSuccess").addClass("d-block");

          $("#alertDanger").addClass("d-none");
          $("#alertDanger").addClass("d-none");
          $("#alertWarning").removeClass("d-block");
          $("#alertWarning").removeClass("d-block");
          clearInput();
          setUserState(true);
        })
        .catch((error) => {
          console.log(error?.response?.data);
          if (error?.response?.data?.message == "User already exists") {
            $("#alertWarning").removeClass("d-none");
            $("#alertWarning").addClass("d-block");

            $("#alertSuccess").addClass("d-none");
            $("#alertDanger").addClass("d-none");

            $("#alertSuccess").removeClass("d-block");
            $("#alertDanger").removeClass("d-block");
          } else {
            $("#alertDanger").removeClass("d-none");
            $("#alertDanger").addClass("d-block");

            $("#alertSuccess").addClass("d-none");
            $("#alertWarning").addClass("d-none");

            $("#alertSuccess").removeClass("d-block");
            $("#alertWarning").removeClass("d-block");
          }
        });
    }
  };
  const clearInput = () => {
    UserData.userName = "";
    UserData.email= "";
    UserData.phone= "";
    UserData.city= "";
    UserData.password = "";
    UserData.confirmPassword = "";
    $("#userName").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#city").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
  };
  const keyState = (e) => {
    if (e.code == "Backspace") {
      const user = { ...UserData };
      user[e.target.name] = "";
      setUserData(user);
    } else if (e.code == "Enter") {
      if (e.target.name == "userName") $("#email").trigger("focus");
      else if (e.target.name == "email") $("#phone").trigger("focus");
      else if (e.target.name == "phone") $("#city").trigger("focus");
      else if (e.target.name == "city") $("#password").trigger("focus");
      else if (e.target.name == "password") $("#confirmPassword").trigger("focus");
      else if (e.target.name == "confirmPassword") $("#addButton").trigger("focus");
    }
  };

  return (
    <>
      <div className="mt-4 bg-white rounded-3 overflow-hidden border border-2 border-back">
        <div className='fileTitle'>بيانات المستخدمين</div>
        <div className={`row inputDiv`}>
          <div className="col-md-3 mb-4">
            <label htmlFor="userName" className="form-label">
              إسم المستخدم
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className={`inputStyle `}
                id="userName"
                name="userName"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">الرجاء إدخال إسم المستخدم</div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <label htmlFor="email" className="form-label">
             البريد الالكتروني
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className={`inputStyle `}
                id="email"
                name="email"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">الرجاء إدخال البريد الالكتروني </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <label htmlFor="phone" className="form-label">
             رقم الهاتف
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className={`inputStyle`}
                id="phone"
                name="phone"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">الرجاء إدخال رقم الهاتف </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <label htmlFor="city" className="form-label">
              المدينة
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className={`inputStyle`}
                id="city"
                name="city"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">الرجاء إدخال إسم المدينة</div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="password" className="form-label">
              الرقم االسري
            </label>
            <div className="input-group has-validation">
              <input
                type="password"
                className={`inputStyle`}
                id="password"
                name="password"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">الرجاء إدخال الرقم السري</div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              تأكد الرقم السري
            </label>
            <div className="input-group has-validation">
              <input
                type="password"
                className={`inputStyle`}
                id="confirmPassword"
                name="confirmPassword"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}
              />
              <div className="invalid-feedback">
                إدخل تاكيد الرقم السري أو تأكد انه يطابق الرقم السري
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <button
              id="addButton"
              className={`fileButtonStyle mt-4`}
              onClick={() => saveUser()}
            >
              حــفــظ
            </button>
          </div>
          <div
            className="alert alert-success d-none"
            id="alertSuccess"
            role="alert"
          >
            تمت الاضافة بنجاح
          </div>
          <div
            className="alert alert-danger d-none"
            id="alertDanger"
            role="alert"
          >
            حدث خطاء الرجاء إعادة المحاولة
          </div>
          <div
            className="alert alert-warning d-none"
            id="alertWarning"
            role="alert"
          >
            هذا المستخدم موجود
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 d-flex flex-column align-items-center rounded-3 border border-2 border-back">
        <div className='fileTitle'>المستخدمين</div>

        <div className="w-100">
          <div
            className={`table-responsive text-center tableScroll`}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">إسم المستخدم</th>
                  <th scope="col">البريد الالكتروني</th>
                  <th scope="col">الهاتف</th>
                  <th scope="col">المدينة</th>
                  <th scope="col">الرقم السري</th>

                </tr>
              </thead>
              <tbody>
                {
                allUser?.map((element, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{element.userName}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                    <td>{element.city}</td>
                    <td>{element.password}</td>
                    <td>
                      <button
                        onClick={() => startUpdate(element.id)}
                        type="button"
                        className={`m-0 fs-6 btn btn-warning UpdateButton`}
                      >
                        <i className="fa-solid fa-pen text-light"></i>
                      </button>
                      <button
                        onClick={() => deleteUser(element.id, index)}
                        type="button"
                        className="m-0 fs-6 btn btn-danger"
                      >
                        <i className="fa-solid fa-x text-light"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      {userId ? (
        <div className={SignUpStyle.updateForm} id="updateForm">
          <div className={SignUpStyle.closeBox}>
            <i
              className={`fa-regular fa-circle-xmark text-danger ${SignUpStyle.closeButton}`}
              onClick={() => closeForm()}
            ></i>
          </div>
          {type === "update" ? (
            <UpdateUser userId={userId} />
          ) : (
            <DeleteUser userId={userId} stat={setUserState} />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
