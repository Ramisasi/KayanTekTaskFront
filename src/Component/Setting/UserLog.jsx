import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import { conIp } from "../../connection";

export default function UserLog({ userId }) {
  const [liCount, setLiCount] = useState([]);
  const [typeCount, setTypeCount] = useState(0);
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const size = 5;

  const getUsers = async () => {
    await axios({
      method: "get",
      url: `${conIp}/test/v1/user/getAllUser`,
      headers: {
        authorization: token,
      },
      // params: {
      //   size,
      //   page: typeCount,
      // },
    })
      .then((result) => {
        setUsers(result.data.users);
      })
      .catch((error) => console.log(error));
  };
  const getCount = async () => {
    await axios({
      method: "get",
      url: `${conIp}/test/v1/user/getUserCount`,
      headers: {
        authorization: token,
      },
    })
      .then((result) => pagination(result?.data?.userCount))
      .catch((error) => console.log(error));
  };

  const pagination = (result) => {
    if (result) {
      const count = Math.ceil(result / size);
      if (count && count > 1) {
        const array = [];
        for (let i = 0; i < count; i++) {
          const liItem = (
            <li className="page-item">
              <a
                onClick={() => {
                  setTypeCount(i + 1);
                }}
                className={`page-link LinkColor`}
              >
                {i + 1}
              </a>
            </li>
          );
          array.push(liItem);
        }
        setLiCount(array);
      }
    }
  };
  const clickUser = (event) => {
    $(".list-group-item").removeClass("settingActive", 10000);
    $(`#${event.target.id}`).addClass("settingActive", 10000);
  };
  const doubleClickUser = (event) => {
    userId(event.target.id);
  };
  useEffect(() => {
    dispatch(setUser);
    getCount();
  //  getUsers();
  }, []);
  useEffect(() => {
   // getUsers();
  }, [typeCount]);
  return (
    <>
      <div className="list-group">
        {users.length
          ? users.map((user, index) => (
              <p
                className={`list-group-item list-group-item-action m-0 ${
                  index == 0 ? "settingActive" : ""
                }`}
                id={user.id}
                aria-current="true"
                onClick={(e) => clickUser(e)}
                onDoubleClick={(e) => doubleClickUser(e)}
              >
                {user.userName}
              </p>
            ))
          : ""}
      </div>
      <div className="mt-3">
        <nav aria-label="Page navigation example mt-25">
          <ul className="pagination justify-content-center">{liCount}</ul>
        </nav>
      </div>
    </>
  );
}
