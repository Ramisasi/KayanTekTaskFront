import React, { useState } from 'react'

import { setUser } from "../../Redux/UserData";
import SignIn from "../SignIn/SignIn";
import CustomerSignUp from "../CustomerSignUp/CustomerSignUp.jsx";
import ConfiremEmail from "../ConfiremEmail/ConfiremEmail.jsx";

export default function SignForm() {
    const [formStatus , setFormStatus] = useState('SignIn')
    const signIn = ()=>{
        setFormStatus("SignIn")
        console.log(22);
    }
    const signInCustomer = ()=>{
      //  navigate("")

    }
    const signUp = ()=>{
        setFormStatus("signUp")
    }
  return <>
  <div className='SignForm overflow-hidden'>

    <div className='row d-flex justify-content-around align-items-center h-100'>
     <div className='col-md-2'>
     <div className=' text-center'>
        <h5>sign as user</h5>
        <button className='btn btn-info px-5 mb-4' onClick={()=>signIn()}>Sign user</button>
        </div>
        <div className='text-center'>
        <h5>sign as customer</h5>
        <button className='btn btn-primary px-5 mb-4' onClick={()=>signInCustomer()}>Sign Customer</button>
        </div>
        <div className=' text-center'>
        <h5>SignUp as customer</h5>
        <button className='btn btn-primary px-5 mb-4' onClick={()=>signUp()} >SignUp Customer</button>

        </div>
     </div>
     <div className='col-md-10'>
        {
            formStatus == 'SignIn' ? <SignIn /> : formStatus == 'signUp' ?<CustomerSignUp /> : ""
        }


     </div>
    </div>on

  </div>
  </>
}
