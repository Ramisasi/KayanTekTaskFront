import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/UserData";
import { conIp } from "../connection";

export default function GetAllUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [allUser, setAllUser] = useState([]);
  const Users = async () => {
    await axios
      .get(`${conIp}/test/v1/user/getAllUser`, {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        setAllUser(result?.data);
      })
      .catch((err) => {
        if (err) navigate("/signIn");
      });
  };

  useEffect(() => {
    dispatch(setUser);
    Users();
  }, []);
  return { allUser };
}
