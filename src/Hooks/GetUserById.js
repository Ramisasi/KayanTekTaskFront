import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import { conIp } from "../connection";

const GetUserById = (id) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [UserDate, setUserDate] = useState([]);
  const User = async () => {
    await axios
      .get(`${conIp}/api/v1/user/getUserById`, {
        params: {
          id,
        },
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        setUserDate(result?.data?.users);
        console.log(UserDate);
      })
      .catch((err) => {
        if (err) navigate("/signIn");
      });
  };
  useEffect(() => {
    dispatch(setUser);
    User();
  }, []);
  return { UserDate };
};
export default GetUserById;
