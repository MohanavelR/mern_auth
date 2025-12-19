import { useEffect, useRef } from "react";
import { useContext} from "react";
import { useVerifyAccount } from "../services/useAuth";
import { AppContaxt } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import onSubmitHandle from "../context/handleSubmit";
const VerifyAccount = () => {
  const inputref = useRef([]);
  const { setIsLoggedIn, getUserInformation, userData, isLoggedIn } = useContext(AppContaxt);
  
  const navigate = useNavigate();
  /* input function */
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
  /* Verification Account */
  async function verifyOtp() {
      const arrayotp = inputref.current.map((e) => e.value);
      let otp = arrayotp.join("");
      const data = await useVerifyAccount(otp);
      if (data.is_success) {
        setIsLoggedIn(true);
        getUserInformation();
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
  }
  
// useEffect(() => {
//   if (!isLoggedIn || userData?.isAccountVerified) {
//     navigate("/");
//   }
// }, [isLoggedIn, userData, navigate]);
  return (
    <>
      <div className="form-box">
        <form action="" onSubmit={onSubmitHandle} className="form-field">
          <h1 className="heading text-lg ">Email Verification OTP</h1>
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
            <button onClick={verifyOtp} className="form-btn">
              Verify Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyAccount;
