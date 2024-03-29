import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { passResetAxios } from '../../Services/axios';
import { errorToast, toastSuccess } from '../../Services/tostify';

const PasswordRes = () => {

  const [change,handleChange] = useState("");
  const [stateButton ,setStateButton ] = useState(true);

  const handleSubmit = (e)=>{
    setStateButton(false)
    e.preventDefault()
    console.log(change);
    passResetAxios({email:change})
    .then((res)=>{
      setStateButton(true)
      if(res.status === 200){
        handleChange("")
        toastSuccess("Reset link Generated Successfully...Check your e-mail")
      }
    })
    .catch((err)=>{
      setStateButton(false)
      if(err.response.status === 401){
        errorToast("Invalid Credentials")
        handleChange("")
      }
    })
  }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <div>
      <h4 className='text-start'>Password Reset Form :</h4>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Registered Email-id" aria-label="Recipient's username" value={change} onChange={(e)=>handleChange(e.target.value)} aria-describedby="button-addon2" required/>
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">{stateButton ? "Send" : 
            <ColorRing
            visible={true}
            height="25"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
          }</button>
        </div>
        </form>
          <div className="form-text">Enter your valid email Id above and hit send button to get the password reset mail in your E-mail</div>
      <br/>
      <div className='w-100 text-align-left d-flex'>
      <Link to="/login">Login page</Link>
      <div className='ms-auto'>
      <Link to="/signup">Signup page</Link>
      </div>
      </div>
      </div>
    </div>
  )
}

export default PasswordRes