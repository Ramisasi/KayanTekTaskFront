import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserData";
const useDeleteUser = (id) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let [UserDate, setUserDate] = useState([]);
  let [state, setState] = useState(true);
  const User = async () => {
    await axios
      .get("http://localhost:3000/api/v1/user/deleteUser", {
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

export default useDeleteUser;
