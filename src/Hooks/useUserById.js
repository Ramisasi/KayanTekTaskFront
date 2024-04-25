import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserData";
import { conIp } from "../connection";
const useUserById = (id) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [UserDate, setUserDate] = useState([]);
  let [state, setState] = useState(true);
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
        setUserDate(result?.data?.user);
      })
      .catch((err) => {
        if (err) setState(false);
      });
  };
  useEffect(() => {
    dispatch(setUser);
    User();
  }, []);
  return { UserDate, state };
};
export default useUserById;
