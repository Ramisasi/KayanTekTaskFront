import React, { useLayoutEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";
import HomeStyle from "./Home.module.css";
import { NavLink, Navigate } from "react-router-dom";
import ViewType from "../../Hooks/ViewType";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/UserData";
import axios from "axios";
import { conIp } from "../../connection";
export default function Home() {
  const { token } = useSelector((state) => state.user);
  const [allFileCount, setAllFileCount] = useState(0);
  const [allEndRegistryCount, setAllEndRegistryCount] = useState(0);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(setUser());
    // getAllFileCount();
    // getAllEndRegistryDate();
    // getTypeCount("persons");
    // getTypeCount("company");
    // getTypeCount("customs");
  }, []);
  return (
    // <div className={`${HomeStyle.homeDiv} row mt-0 align-items-center`}>
    //   <div className={`${HomeStyle.CounterDiv} col-md-4 p-4`}>
    //     <div className="row p-1">
    //       <NavLink to={"/File"} className="p-1">
    //         <div
    //           className={`col-md-12 overflow-hidden p-4 my-3 ${HomeStyle.backgroundOne} ${HomeStyle.borderRadius}`}
    //         >
    //           <div className={HomeStyle.CounterDivTop}>
    //             <div className={HomeStyle.divTopRight}>
    //               <h3>{allFileCount}</h3>
    //               <p className="m-0">عدد الشركات</p>
    //             </div>
    //             <div className={HomeStyle.divTopLeft}>
    //               <i className="fa-regular fa-building"></i>
    //             </div>
    //           </div>

    //           {/* <div className={HomeStyle.CounterDivBottom}>عرض الشركات</div> */}
    //         </div>
    //       </NavLink>
    //       <NavLink to={"/ViewCompany"} className="p-1">
    //         <div
    //           className={`col-md-12 overflow-hidden py-4 my-3 ${HomeStyle.backgroundThree} ${HomeStyle.borderRadius}`}
    //         >
    //           <div className={HomeStyle.CounterDivTop}>
    //             <div className={HomeStyle.divTopRight}>
    //               <h3>{allEndRegistryCount}</h3>
    //               <p className="m-0">إنتهاء الرمز الاحصائي</p>
    //             </div>
    //             <div className={HomeStyle.divTopLeft}>
    //               <i className="fa-regular fa-calendar-xmark"></i>
    //             </div>
    //           </div>

    //           {/* <div className={HomeStyle.CounterDivBottom}>عرض الشركات</div> */}
    //         </div>
    //       </NavLink>
    //     </div>
    //   </div>
    //   <div className={`${HomeStyle.chartDiv} col-md-8 p-0`}>
    //     <div className={HomeStyle.chartDivTop}>
    //       <Doughnut
    //         data={FileData}
    //         options={options}
    //         className={HomeStyle.chartStyle}
    //       />
    //     </div>
    //     <div className={HomeStyle.chartDivBottom}>
    //       <div className={HomeStyle.chartBottomDivs}>
    //         <div
    //           className={`${HomeStyle.ColorDiv} ${HomeStyle.ColorTow}`}
    //         ></div>
    //         <p>عدد الاشخاص</p>
    //       </div>
    //       <div className={HomeStyle.chartBottomDivs}>
    //         <div
    //           className={`${HomeStyle.ColorDiv} ${HomeStyle.ColorOne}`}
    //         ></div>
    //         <p>عدد الشركات</p>
    //       </div>
    //       <div className={HomeStyle.chartBottomDivs}>
    //         <div
    //           className={`${HomeStyle.ColorDiv} ${HomeStyle.ColorTree}`}
    //         ></div>
    //         <p>عدد المصرحين</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>ssss</div>
  );
}
