import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { conIp } from '../../connection.js';
export default function UsersStatus() {
    const [onlineData, setOnlineData] = useState([])
    const socket = io(conIp);
    const data = {
        page: 1,
        fields:"userName,isLogin,updatedAt"
      };

    useEffect(() => {
      socket.emit("getOnlineUser", data);
      socket.on("onlineUser", (data) => {
        console.log(data[0]);
        setOnlineData(data);
      });
    } , []);
  return <>

    <div class="container mb-5 p-5">
        <div id="rowData" class="row justify-content-center  align-items-center">
{
onlineData?.map((element)=>

<div className="col-md-4 my-2 p-2">
<div className="">
    <div className="card">
        <div className="card-body">
            <h5 className="card-title"><h3>user Name</h3>{element.userName}</h5>
            <p className="card-text"><h3>Status</h3>{element.isLogin ==true ? "online" : "offline"}</p>
        </div>
    </div>
</div>
</div>

)

}
        </div>
        </div>
  </>
}
