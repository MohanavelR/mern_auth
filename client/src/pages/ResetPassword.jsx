import { useContext, useState } from "react";
import React, { useEffect, useRef } from "react";
import { AppContaxt } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import onSubmitHandle from "../context/handleSubmit";
import { sendResetPasswordOTP, useResetPassword } from "../services/useAuth";

const ResetPassword = () => {
  const { isLoggedIn } = useContext(AppContaxt);
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  })
  const inputref = useRef([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [newpassowd, setnewpassowd] = useState(null);
  const [otp, setOtp] = useState(null);
  const [load, setLoad] = useState(false);
  const [process, setProcess] = useState({
    isEmailsent: false,
    isSubmitOtp: false,
  });
  /* Sent Reset Otp */
  async function sentResetOTP() {
    setLoad(true);
    const data = await sendResetPasswordOTP(email);
    if (data.is_success) {
      setLoad(false);
      setProcess({ ...process, isEmailsent: true });
      toast.success(data.message);
    } else {
      setLoad(false);
      toast.error(data.message);
    }
  }
  /* Set OTP */
  function submitOtp() {
    setLoad(true);
    const arrayotp = inputref.current.map((e) => e.value);
    let otp = arrayotp.join("");
    setLoad(false);
    setProcess({ ...process, isSubmitOtp: true });
    setOtp(otp);
  }

  /* Otp input */
  function handleInput(e, index) {
    if (e.target.value.length > 0 && index < inputref.current.length - 1) {
      inputref.current[index + 1].focus();
    }
  }
  function keydown(e, index) {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputref.current[index - 1].focus();
    }
  }
  /*--------------------------------*/
  async function resetNewPassword() {
    const data = await useResetPassword(email, otp, newpassowd);
    if (data.is_success) {
      toast.success(data.message);
      navigate("/auth/login");
    } else {
      toast.error(data.message);
    }

  }

  return (
    <div className="form-box flex-wrap">
    {/* Email Verification */}
      {!process.isEmailsent && (
        <form className="form-field" action="" onSubmit={onSubmitHandle}>
          <h1 className="heading">Reset Password</h1>
          <div class=" text-yellow-700 text-center" role="alert">
            <strong class="font-bold">Warning!</strong>
            <span class="block sm:inline">
              Don't refresh the page until the process is completed.
            </span>
          </div>
          <div className="text-sm text-center">
            <span className="whitespace-nowrap">Send OTP &gt;</span>
            <span className="whitespace-nowrap">Verification OTP &gt;</span>
            <span className="">New Password</span>
          </div>
          <h1 class="text-center">SENT OTP</h1>
          <h2 className="sub-heading">Enter Your Registered Email Address</h2>
          <div className="input-box">
            <label htmlFor="" className="label-field">
              <i className="fa-solid fa-envelope"></i>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email id"
              className="input-field"
            />
          </div>
          <div className="flex">
            {load ? (
              <button disabled className="form-btn flex justify-center">
                {" "}
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </button>
            ) : (
              <button onClick={sentResetOTP} className="form-btn">
                Sent OTP
              </button>
            )}
          </div>
        </form>
      )}
      {/* --------------------------------------- */}
      {/* set Otp */}
      {!process.isSubmitOtp && process.isEmailsent && (
        <form action="" onSubmit={onSubmitHandle} className="form-field">
          <h1 className="heading text-lg ">Email Verification OTP</h1>
          <div class=" text-yellow-700 text-center" role="alert">
            <strong class="font-bold">Warning!</strong>
            <span class="block sm:inline">
              Don't refresh the page until the process is completed.
            </span>
          </div>
          <div className="text-sm text-center">
            <span className="whitespace-nowrap">Send OTP &gt;</span>
            <span className="whitespace-nowrap">Verification OTP &gt;</span>
            <span className="">New Password</span>
          </div>
          <h1 class="text-center">Verification OTP</h1>
          <h1 className="sub-heading ">
            Enter the 6-digit code sent to your email id
          </h1>
          <div className="flex justify-center items-center space-x-2 mt-5 sm:mt-10">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  onKeyDown={(e) => keydown(e, index)}
                  ref={(e) => (inputref.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  className=" input-field w-10 h-10 text-center bg-zinc-500 rounded-lg "
                />
              ))}
          </div>
          <div className="flex">
            <button onClick={submitOtp} className="form-btn">
              Verify OTP
            </button>
          </div>
        </form>
      )}
      {/* ------------------------------------------ */}
      {/* send New Password */}
      {process.isEmailsent && process.isSubmitOtp && (
        <form className="form-field" action="" onSubmit={onSubmitHandle}>
          <h1 className="heading">Reset Password</h1>
          <div class=" text-yellow-700 text-center" role="alert">
            <strong class="font-bold">Warning!</strong>
            <span class="block sm:inline">
              Don't refresh the page until the process is completed.
            </span>
          </div>
          <div className="text-sm text-center">
            <span className="whitespace-nowrap">Send OTP &gt;</span>
            <span className="whitespace-nowrap">Verification OTP &gt;</span>
            <span className="">New Password</span>
          </div>
          <h1 class="text-center">New Password</h1>
          <h2 className="sub-heading">Enter Your New Password</h2>
          <div className="input-box">
            <label htmlFor="" className="label-field">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              onChange={(e) => setnewpassowd(e.target.value)}
              type="text"
              placeholder="New Password"
              className="input-field"
            />
          </div>
          <div className="flex">
            {load ? (
              <button disabled className="form-btn flex justify-center">
                {" "}
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </button>
            ) : (
              <button onClick={resetNewPassword} className="form-btn">
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
