import React from "react";
import fileStyle from "../File/fileStyle.module.css";
import SignUpStyle from "./signUpStyle.module.css";

export default function UserRow({ userDate, index }) {
  const x = true;

  const updateU = (id) => {
    return <div className={SignUpStyle.updateForm}>dsdfd</div>;
  };
  return (
    <>
      <tr>
        <th scope="row">{index}</th>
        <td>{userDate.userName}</td>
        <td>{userDate.password}</td>
        <td>{userDate.role}</td>
        <td>
          <button
            onClick={() => updateU(userDate.id)}
            type="button"
            className={`m-0 fs-6 btn btn-warning ${fileStyle.UpdateButton}`}
          >
            <i className="fa-solid fa-pen text-light"></i>
          </button>
          <button type="button" className="m-0 fs-6 btn btn-danger">
            <i className="fa-solid fa-x text-light"></i>
          </button>
        </td>
      </tr>
    </>
  );
}
