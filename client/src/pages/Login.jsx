import React, { useContext, useEffect, useState } from "react";
import onSubmitHandle from "../context/handleSubmit";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "../services/useAuth";
import { AppContaxt } from "../context/AppContextProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
   const { isLoggedIn }= useContext(AppContaxt)
  const [load, setLoad] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setIsLoggedIn, getUserInformation } = useContext(AppContaxt);
  const navigate = useNavigate();

  /* Login And Register */
  async function HandleSubmit() {
    setLoad(true);
    /* Register */
    if (isSignUp) {
      const data = await useRegister(inputData);
      if (data.is_success) {
        setLoad(false);
        setIsLoggedIn(true);
        getUserInformation();
        toast.success(data.message);
        navigate("/");
      } else {
        setLoad(false);
        toast.error(data.message);
      }
    } else {
      /* Login */
      const data = await useLogin(inputData);
      if (data.is_success) {
        setLoad(false);
        setIsLoggedIn(true);
        getUserInformation();
        toast.success(data.message);
        navigate("/");
      } 
      else {
        setLoad(false);
        toast.error(data.message);
      }
    }
  }
  function exchangePage() {
    setIsSignUp(!isSignUp);
  }
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  })
  return (
    <div className="form-box">
      <form onSubmit={onSubmitHandle} autoComplete="off" className="form-field">
        <h2 className="heading">{isSignUp ? "Create Account" : "Login"}</h2>
        <h2 className="sub-heading">
          {isSignUp ? "Create Your Account" : "Login to Your Account"}
        </h2>
        {isSignUp && (
          <div className="input-box">
            <label htmlFor="name" className="label-field">
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="input-field"
              onChange={(e) => {
                setInputData({ ...inputData, name: e.target.value });
              }}
            />
          </div>
        )}
        <div className="input-box">
          <label htmlFor="email" className="label-field">
            <i className="fa-solid fa-envelope"></i>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) => {
              setInputData({ ...inputData, email: e.target.value });
            }}
          />
        </div>

        <div className="input-box">
          <label htmlFor="password" className="label-field">
            <i className="fa-solid fa-lock"></i>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="input-field"
            onChange={(e) => {
              setInputData({ ...inputData, password: e.target.value });
            }}
          />
        </div>
        {!isSignUp && (
          <div className="px-3 text-lime-500">
            <Link
              to={"/auth/reset-password"}
              className="hover:text-lime-400 text-sm"
            >
              Forgot Password ?
            </Link>
          </div>
        )}
        <div className="flex justify-center">
          {load ? (
            <button disabled className="form-btn flex justify-center">
              {" "}
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          ) : isSignUp ? (
            <button onClick={HandleSubmit} type="submit" className="form-btn">
              Sign Up
            </button>
          ) : (
            <button
              onClick={HandleSubmit}
              type="submit"
              className="form-btn flex justify-center"
            >
              Sign In{" "}
            </button>
          )}
        </div>
        <div className="flex justify-center">
          {isSignUp ? (
            <p className="whitespace-nowrap text-sm">
              Already Have an Account ?{" "}
              <span
                onClick={exchangePage}
                className="text-lime-500 hover:cursor-pointer"
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="whitespace-nowrap text-sm">
              You Don't Have Account ?{" "}
              <span
                onClick={exchangePage}
                className="text-lime-500 hover:cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
