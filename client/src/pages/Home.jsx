import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContaxt } from '../context/AppContextProvider'

const Home = () => {
 const {userData}= useContext(AppContaxt)
  return (
    <div className='flex min-h-screen justify-center items-center bg-purple-200'>
      <div className=''>
      <h2 className='text-3xl'>Hello, <span className=' text-4xl font-bold'>{userData?userData?.name:'Developer'}</span></h2>
       <button  className=' border-indigo-500 mt-4 text-indigo-500 hover:text-white hover:bg-indigo-500 btn-field'>Get Started <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  )
}

export default Home
