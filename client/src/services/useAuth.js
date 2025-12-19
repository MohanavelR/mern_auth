import axios from 'axios';



const api = axios.create({
  baseURL: "https://mern-auth-tlr4.vercel.app/api/",
  withCredentials: true,
});



export const useLogin = async (data) => {
  try {   
    const response = await api.post('auth/login',{email:data.email,password:data.password});
    return response.data;
  } catch (error) {
    return error
  }
};

export const useRegister = async (data) => {
 try {
   const response = await api.post(`auth/register`,{email:data.email,password:data.password,name:data.name},{withCredentials:true});
  return response.data;
 } catch (error) {
    return error  
 }
};

export const useLogout = async () => {

  try {
  const response = await api.post('/auth/logout',{},{withCredentials:true});
  return response.data;
    
  } catch (error) {
    return error
  }
 
};
export const checkAuth = async () => {
 try {   
    const response = await api.get(`/auth/is-auth`,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    return error
  }
};

export const getUser = async () => {
  try {   
    const response = await api.get('user/data',{withCredentials:true});
    return response.data;
  } catch (error) {
    return error
  }
};

export const sendVerificationOtp = async()=> {
   try {
    const response = await api.post('auth/send-verify-otp',{},{withCredentials:true})
    return response.data
  } 
   catch (error) {
    return error
   }    
}
export const useVerifyAccount= async (otp) =>{
 try {
    const response = await api.post('auth/verify-account',{otp},{withCredentials:true})
    return response.data
  } 
   catch (error) {
    return error
   }   
}

export const sendResetPasswordOTP = async (email) =>{
 try {
    const response = await api.post('auth/send-reset-otp',{email},{withCredentials:true})
    return response.data
  } 
   catch (error) {
    return error
   }   
}
export const useResetPassword = async (email,otp,newpassword) =>{
 try {
    const response = await api.post('auth/reset-password',{email,otp,newpassword},{withCredentials:true})
    return response.data
  } 
   catch (error) {
    return error
   }   
}
