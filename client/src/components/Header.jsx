import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendVerificationOtp, useLogout } from "../services/useAuth";
import {toast} from 'react-toastify'
import {AppContaxt } from '../context/AppContextProvider'
const Header = () => {
    const nav = useNavigate()
    const {isLoggedIn,setIsLoggedIn,userData,setUserData }= useContext(AppContaxt)
    const [dropDownOpen,setDropDownOpen] = useState(false)
    const [load,setLoad] = useState(false)
/*---------------Logout Function------------- */
    async function logoutHandle(){
        const data = await useLogout()
        if(data.is_success){
          toast.success(data.message)
          setIsLoggedIn(false),
          setDropDownOpen(false)
          setUserData(false)
        }
        else{
          toast.error(data.message)
        }
}

/*----------sent verification OTP--------------- */
async function sentVerifyOTP(){
      setLoad(true)
      const data = await sendVerificationOtp()  
      if(data.is_success){
          toast.success(data.message)
          setLoad(false)
          setDropDownOpen(false)
          nav('/auth/verify-account')
        }
        else{
          toast.error(data.message)
          setLoad(false)
          setDropDownOpen(false)
        }
}
/* Drop Down */
function handleDropDown(){
    setDropDownOpen(!dropDownOpen)
}

  return ( 
    <header className="fixed  top-0 left-0 p-3  w-full ">
      <div className="flex">
        <div className="flex-1 py-3 w-20 text-lg lg:text-4xl md:text:2xl  ms-5 text-indigo-900">
          <i className="fa-brands me-3 fa-slack"></i>
          <a className="font-extrabold" href="#">Auth</a>
        </div>
        {/* Check Authenticated */}
        {
         isLoggedIn?
            <div className="relative group fliex-auto p-2 inline-block me-15">
              <button onClick={handleDropDown} className="text-lg hover:cursor-pointer text-indigo-900 lg:text-4xl md:text:2xl">
                  <i className="fa-solid fa-circle-user"></i>
              </button>
              <div className={`fixed ${dropDownOpen?'block':'hidden'} bg-white top-15 md:top-20 right-20 p-3 rounded shadow-lg z-50`}>
               
               {/* check Verification */}
               {!userData.isAccountVerified &&
                <button onClick={sentVerifyOTP}  className="block flex cursor-pointer  gap-2 px-4 py-2 hover:bg-gray-100">
                  Verify Email{load &&  <div className="w-6 h-6 border-4 border-indigo border-t-transparent rounded-full animate-spin"></div>}
                </button>
               }
                <a href="#" onClick={logoutHandle} className="block px-4 py-2 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            </div>:
        <Link className="btn-field px-6 py-2 me-4 h-10  " to='/auth/login' >Login <i className="fa-solid fa-arrow-right"></i></Link>
        }
      </div>
    </header>
  );
};

export default Header;
