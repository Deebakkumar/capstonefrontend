import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Circles, ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { singUpAxios } from "../../Services/axios";
import { defaultToast, toastSuccess, toastWarn } from "../../Services/tostify";

const Signup = () => {
  const [showPass, setShowPass] = useState("password");
  const [buttonLoader ,setButtonLoader ] = useState(true);
  const navigate = useNavigate();

  //yup validation
  const userValidationSchema = yup.object().shape({
    userName: yup
      .string()
      .min(2, "Enter a valid user Name")
      .required("User Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Pasword must have atleast 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password is required"),
  });
  const init = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  //formik
  const { values, handleChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: init,
      validationSchema: userValidationSchema,
      onSubmit: (values) => {
        setButtonLoader(false)
        singUpAxios(values).then((res)=>{
          console.log(res)
          if(res.status === 200){
            toastSuccess("SignUp Successfully created ")
            defaultToast("Check your Email and Verify your token and then login")
            navigate("/login")
        setButtonLoader(true)
          }
        })
          .catch((res)=>{
            if(res.response.status === 400){
              toastWarn("User Already exist")
        setButtonLoader(true)

            }
          })
      },
    });


  return (
    <div>
      <div
        className="d-flex text-start justify-content-center align-items-center"
        style={{ width: "100%", height: "90vh" }}
      >
        <form className="" style={{ width: "300px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usernameid" className="form-label">
              User Name
            </label>
            <input
              type="text "
              required=""
              className={
                errors.userName && touched.userName !== undefined
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={values.userName}
              id="usernameid"
              name="userName"
              onChange={handleChange}
              aria-describedby="usernameHelp"
              onBlur={handleBlur}
            />
            <div id="usernameHelp" className="invalid-feedback">
              {errors.userName}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              values={values.email}
              name="email"
              className={
                errors.email && touched.email !== undefined
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div id="usernameHelp" className="invalid-feedback">
              {errors.email}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPass}
              value={values.password}
              name="password"
              className={
                errors.password && touched.password !== undefined
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="exampleInputPassword1"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div id="usernameHelp" className="invalid-feedback">
              {errors.password}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type={showPass}
              className={
                errors.confirmPassword && touched.confirmPassword !== undefined
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={values.confirmPassword}
              name="confirmPassword"
              id="exampleInputPassword1"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div id="usernameHelp" className="invalid-feedback">
              {errors.confirmPassword}
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showpasswordid"
              onChange={() =>
                showPass === "password"
                  ? setShowPass("text")
                  : setShowPass("password")
              }
            />
            <label className="form-check-label" htmlFor="showpasswordid">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            {buttonLoader ? "Create" : <ColorRing
              visible={true}
              height="25"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />}
          </button>
          <br />
          <br />
          <div>Already Have an Account? </div>
          <Link to="/login">Singin</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;