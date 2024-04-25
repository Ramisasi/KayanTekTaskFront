import React from "react";
import SignUpStyle from "./signUpStyle.module.css";

export default function updateUser({ userId }) {
  return (
    <div className={SignUpStyle.updateFormChildren}>
      <div className='fileTitle'>بيانات المستخدمين</div>
      <div className={`row inputDiv`}>
        <div className="col-md-12 mb-4">
          <label htmlFor="basic-url" className="form-label">
            إسم المستخدم
          </label>
          <div className="input-group">
            <input
              type="text"
              className='inputStyle'
              id="basic-url"
              aria-describedby="basic-addon3 basic-addon4"
            />
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <label htmlFor="basic-url" className="form-label">
            الرقم االسري
          </label>
          <div className="input-group">
            <input
              type="text"
              className='inputStyle'
              id="basic-url"
              aria-describedby="basic-addon3 basic-addon4"
            />
          </div>
        </div>
        <div className="col-md-6 mt-4">
          <div className="row mt-3">
            <div className="col-md-6 col-6">
              <input
                className="form-check-input float-end me-0 ms-2 border border-2 border-black"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                مدير
              </label>
            </div>
            <div className="col-md-6 col-6">
              <input
                className="form-check-input float-end me-0 ms-2 border border-2 border-black"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                مستخدم
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <button className={`fileButtonStyle mt-4`}>تعديل</button>
        </div>
      </div>
    </div>
  );
}
