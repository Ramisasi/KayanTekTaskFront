import React, { useEffect, useState } from 'react'
import $ from "jquery";
import axios from "axios";
import { conIp } from "../../connection";
import { useSelector } from 'react-redux';
export default function CustomerSignUp() {
    const { token } = useSelector((stat) => stat.user);

    const [loading , serLoading] =useState(false)

    const [UserData, setUserData] = useState({
      userName: "",
      email: "",
      phone: "",
      city: "",
      password: "",
      confirmPassword: "",
    });
    const addUserData = (event) => {
      const user = { ...UserData };
      user[event.name] = event.value;
      setUserData(user);
    };
    const nameError = (state) => {
      if (state) $("#userName").removeClass("is-invalid");
      else $("#userName").addClass("is-invalid");
    };
    const emailError = (state) => {
      if (state) $("#email").removeClass("is-invalid");
      else $("#email").addClass("is-invalid");
    };
    const phoneError = (state) => {
      if (state) $("#phone").removeClass("is-invalid");
      else $("#phone").addClass("is-invalid");
    };
    const cityError = (state) => {
      if (state) $("#city").removeClass("is-invalid");
      else $("#userName").addClass("is-invalid");
    };
    const passwordError = (state) => {
      if (state) $("#password").removeClass("is-invalid");
      else $("#password").addClass("is-invalid");
    };
    const confirmPasswordError = (state) => {
      if (state) $("#confirmPassword").removeClass("is-invalid");
      else $("#confirmPassword").addClass("is-invalid");
    };
    const submitCustomer = async (e) => {
      if (UserData.userName == "") nameError(false);
      else if (UserData.email == "") emailError(false);
      else if (UserData.phone == "") phoneError(false);
      else if (UserData.password == "") passwordError(false);
      else if (
        UserData.confirmPassword == "" ||
        UserData.confirmPassword !== UserData.password
      )
        confirmPasswordError(false);
      else {
        nameError(true);
        emailError(true);
        phoneError(true);
        cityError(true);
        passwordError(true);
        confirmPasswordError(true);
        serLoading(true);
        await axios
          .post(`${conIp}/test/v1/aut/signUp`,UserData, {
            headers: {
              authorization: token,
            },
          })
          .then((result) => {
            serLoading(false);

            $("#alertDanger").removeClass("d-block");
            $("#alertSuccess").removeClass("d-none");
            $("#alertSuccess").addClass("d-block");
            clearInput();

          })
          .catch((error) => {
            serLoading(true);
              $("#alertDanger").removeClass("d-none");
              $("#alertDanger").addClass("d-block");

              $("#alertSuccess").removeClass("d-block");
              $("#alertSuccess").addClass("d-none");
          });
      }
    };
    const clearInput = () => {
      UserData.userName = "";
      UserData.email= "";
      UserData.phone= "";
      UserData.city= "";
      UserData.password = "";
      UserData.confirmPassword = "";
      $("#userName").val("");
      $("#email").val("");
      $("#phone").val("");
      $("#city").val("");
      $("#password").val("");
      $("#confirmPassword").val("");
    };
    const keyState = (e) => {
      if (e.code == "Backspace") {
        const user = { ...UserData };
        user[e.target.name] = "";
        setUserData(user);
      } else if (e.code == "Enter") {
        if (e.target.name == "userName") $("#email").trigger("focus");
        else if (e.target.name == "email") $("#phone").trigger("focus");
        else if (e.target.name == "phone") $("#city").trigger("focus");
        else if (e.target.name == "city") $("#password").trigger("focus");
        else if (e.target.name == "password") $("#confirmPassword").trigger("focus");
        else if (e.target.name == "confirmPassword") $("#addButton").trigger("focus");
      }
    };

  return <>
  <div className='CustomerSignUpImage'>
<div className='CustomerSignUpImageForm'>
<div className="input-group mb-3">
  <input type="text" className="form-control" name='userName' placeholder="إسم المستخدم"  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" name="email" placeholder="الإيميل"  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
</div>

<div className="input-group mb-3">
    <input type="text" className="form-control" name='phone'  placeholder="رقم الهاتف"  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
  </div>

<div className="input-group mb-3">
  <input type="text" className="form-control" name='city' placeholder='المدينة'  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" name="password" placeholder='الرقم السري'  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
</div>
<div className="input-group mb-3">
  <input type="text" className="form-control" name='confirmPassword' placeholder="تاكيد الرقم"  onChange={(e) => addUserData(e.target)}
                onKeyDown={(e) => keyState(e)}/>
</div>

<div>
    {
        loading == false ? <button className='btn - btn-outline-success'  onClick={() => submitCustomer()}>تسجيل الدخول</button> : <button className='spinner-grow'></button>

    }

</div>
<div
            className="alert alert-success d-none"
            id="alertSuccess"
            role="alert"
          >
          تمت التسجيل بنجاح الرجاء تسجيل الدخول
          </div>
<div
            className="alert alert-danger d-none"
            id="alertDanger"
            role="alert"
          >
            حدث خطاء الرجاء إعادة المحاولة
          </div>

</div>
</div>
  </>
}
