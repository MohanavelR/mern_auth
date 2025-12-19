import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Header from './components/Header'
import Home from './pages/Home'
import MessageBox from './components/MessageBox'

import VerifyAccount from './pages/VerifyAccount'
import ResetPassword from './pages/ResetPassword'
import { Route, Routes } from 'react-router-dom'
import AuthLayouts from './layouts/AuthLayouts'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function App() {

  return (
    <>
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<AuthLayouts/>}>
          <Route path='login' element={<Login/>} />
          <Route path='verify-account' element={<VerifyAccount/>} />
          <Route path='reset-password' element={<ResetPassword/>} />
        </Route> 
      </Routes>
    </>
  )
}

export default App
