import React, { useEffect, useLayoutEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import SignIn from "../SignIn/SignIn";
import CustomerSignUp from "../CustomerSignUp/CustomerSignUp.jsx";
import ConfiremEmail from "../ConfiremEmail/ConfiremEmail.jsx";
import SignForm from "../SignForm/SignForm.jsx";

export default function LayOut() {
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(setUser());
  }, []);
  return (
    <>
      {isLogin != false ? (
        <>
          <NavBar />
          <div className="container">
            <Outlet />
          </div>
        </>
      ) : (
        <SignForm />

      )}
    </>
  );
}
