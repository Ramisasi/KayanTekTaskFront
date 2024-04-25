import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import UserLog from "./UserLog";
import { conIp } from "../../connection";
export default function Setting() {
  const [logsData, setLogsData] = useState([]);
  const [page, setPage] = useState(0);
  // const [allCount, setAllCount] = useState(0);
  const { token } = useSelector((state) => state.user);
  const [liCount, setLiCount] = useState([]);
  const [userId, setUserId] = useState(0);
  const [typeCount, setTypeCount] = useState(0);
  const [searchType, setSearchType] = useState("all");

  const dispatch = useDispatch();
  const size = 5;

  const getLogs = async () => {
    await axios({
      method: "get",
      url: `${conIp}/test/v1/logs/getAllLogs`,
      headers: {
        authorization: token,
      },
      params: {
        page: typeCount,
      },
    }).then((result) => {
     setLogsData(result.data.Logs);
    });
  };
  const getCount = async () => {
    await axios({
      method: "get",
      url: `${conIp}/test/v1/logs/getLogsCount`,
      headers: {
        authorization: token,
      },
    }).then((result) => pagination(result?.data?.logCount))
     .catch((error) => console.log(error));
  };
  const getLogsDataCount = async () => {
    const startDate = $("#fromDate").val();
    const endDate = $("#toDate").val();
    if (startDate && endDate) {
      await axios({
        method: "get",
        url: `${conIp}/test/v1/logs/getLogsDataCount`,
        headers: {
          authorization: token,
        },
        params: {
          createdAt:{
            gte : startDate,
            lte : endDate
          },
        },
      })
        .then((result) => {
          console.log(result?.data?.dataLogCount);
         pagination(result?.data?.dataLogCount);
        })
        .catch((error) => {
          console.log(error);
          pagination(0);
        });
    }
  };
  const getLogsByData = async () => {
    const startDate = $("#fromDate").val();
    const endDate = $("#toDate").val();
    console.log("1");
    if (startDate && endDate) {
      await axios({
        method: "get",
        url: `${conIp}/test/v1/logs/getDataLogs`,
        headers: {
          authorization: token,
        },
        params: {
          createdAt:{
            gte : startDate,
            lte : endDate
          },
          page: typeCount,
        },
      }).then((result) => {
        setLogsData(result.data.Logs);
      })
     .catch((error) => console.log(error));
    }
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
    } else {
      setLiCount([]);
    }
  };
  const getBackup = async (e) => {
    await axios({
      method: "get",
      url: `${conIp}/test/v1/backup/getBackup`,
      headers: {
        authorization: token,
      },
    })
      .then((result) => {
        successAlert("show");
        dangerAlert("hide");
      })
      .catch((error) => {
        successAlert("hide");
        dangerAlert("show");
      });
    //var folder = relativePath.split("/");
  };
  const successAlert = (state) => {
    if (state == "hide") $("#alertSuccess").css("display", "none");
    else $("#alertSuccess").css("display", "block");
  };
  const dangerAlert = (state) => {
    if (state == "hide") $("#alertDanger").css("display", "none");
    else $("#alertDanger").css("display", "block");
  };
  const changeSearchType = (event) => {
    const type = event.target.value;
    if (type == "all") {
      hideDate("hide");
      setSearchType("all");
    } else if (type == "user") {
      hideDate("hide");
      setSearchType("user");
    } else {
      hideDate("show");
      setSearchType("date");
    }
  };
  const hideDate = (process) => {
    if (process == "show") $("#delegatesNameDev").slideDown("slow");
    else $("#delegatesNameDev").slideUp("slow");
  };
  useEffect(() => {
    dispatch(setUser);
    getCount();
    getLogs();
    successAlert("hide");
    dangerAlert("hide");
  }, []);
  useEffect(() => {
    if (searchType == "all") getLogs();
   else getLogsByData();
  }, [typeCount, liCount]);
  return (
    <>
      <div className="row mt-5 settingDev">
        <div className="col-md-3 p-2">
          <div className="mb-2">
            <div className=" form-check form-check-inline mx-2 my-0 p-0">
              <input
                className="form-check-input float-end me-0 ms-2"
                type="radio"
                name="searchType"
                value="all"
                id="all"
                defaultChecked
                onChange={(e) => changeSearchType(e)}
              />
              <label className="form-check-label" htmlFor="persons">
                الكل
              </label>
            </div>

            <div className=" form-check form-check-inline mx-2 my-0 p-0">
              <input
                className="form-check-input float-end me-0 ms-2"
                type="radio"
                name="searchType"
                value="data"
                id="data"
                onChange={(e) => changeSearchType(e)}
              />
              <label className="form-check-label" htmlFor="persons">
                التاريخ
              </label>
            </div>
          </div>
          <div id="searchSection">
            <div id="delegatesNameDev" style={{ display: "none" }}>
              <label htmlFor="delegatesName" className="form-label">
                من تاريخ
              </label>
              <div className="input-group has-validation">
                <input
                  type="date"
                  className='inputStyle'
                  id="fromDate"
                  name="fromDate"
                  aria-describedby="basic-addon3 basic-addon4"
                />
              </div>
              <label htmlFor="delegatesName" className="form-label">
                إلي تاريخ
              </label>
              <div className="input-group has-validation">
                <input
                  type="date"
                  className='inputStyle'
                  id="toDate"
                  name="toDate"
                  aria-describedby="basic-addon3 basic-addon4"
                />
              </div>
              <div className="mt-2 text-start ">
                <button
                  className="btn btn-warning px-4 py-2"
                  onClick={() => getLogsDataCount()}
                >
                  بــــحـــــث
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="bg-white d-flex flex-column align-items-center rounded-3 border border-2 border-back">
            <div className='fileTitle'>متابعة الحركة</div>
            <div className="w-100 mt-4">
              <div
                className={`table-responsive text-center tableScroll`}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">إسم العملية</th>
                      <th scope="col">تفاصيل العملية</th>
                      <th scope="col">التاريخ</th>
                      <th scope="col">الوقت</th>
                      <th scope="col">المستخدم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logsData.length ? (
                      logsData.map((element, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{element.logTitle}</td>
                            <td>{element.logDescription}</td>
                            <td>{element.createdAt.split("T")[0]}</td>
                            <td>
                              {element.createdAt.split("T")[1].split("Z")[0]}
                            </td>
                            <td>{element?.userID.userName}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-3">
              <nav aria-label="Page navigation example mt-25">
                <ul className="pagination justify-content-center">{liCount}</ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
