import axios from "axios"
import API from "../url"

export const singUpAxios =  (values)=>{
  return axios({
        url:`${API}/users/signup`,
        method:"post",
        data:values
      })
}

export const verifyEmailAxios =  (params)=>{
  return axios({
        url:`${API}/users/verifyemail/${params}`,
        method:"get"
      })
}

export const passResetAxios =  (data)=>{
  return axios({
        url:`${API}/users/resetpassword`,
        method:"post",
        data:data
      })
}

export const checkString =  (data)=>{
  return axios({
        url:`${API}/users/resetpassword/${data}`,
        method:"get"
      })
}

export const changePassAxios =  (data , string)=>{
  return axios({
        url:`${API}/users/changepassword/${string}`,
        method:"post",
        data:data
      })
}

export const loginAxios =  (data)=>{
  return axios({
        url:`${API}/users/login`,
        method:"post",
        data:data
      })
}

export const verifyTokenAxios =  (data)=>{
  return axios({
        url:`${API}/users/verifyToken`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

// setting api
export const settingsAxios =  (data)=>{
  return axios({
        url:`${API}/email/settings`,
        method:"post",
        data:data,
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const getCredential =  ()=>{
  return axios({
        url:`${API}/email/getCredential`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token"),
          'user':localStorage.getItem("user")
      }
      })
}