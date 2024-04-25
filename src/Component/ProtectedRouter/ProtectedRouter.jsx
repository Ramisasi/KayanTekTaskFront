import React, { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";

export default function ProtectedRouter(props) {
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(setUser());
  }, []);
  if (!isLogin) return <Navigate to={"/SignIn"} />;
  else return props.children;
}
