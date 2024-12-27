import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
  const [otp ,setOTP]=useState('')
const navigate  =  useNavigate()

  const submitHandler=async (e)=>
  {
    e.preventDefault()
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
          rideId: props.ride._id,
          otp: otp
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  if (response.status === 200) {
      props.setConfirmRidePopUp(false)
      props.setRidePopUp(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
  }

  }
  return (
    <div>
       <h5
        className="p-1 text-center  absolute top-0  w-[93%]  "
        onClick={() => {
          props.setConfirmRidePopUp(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-10">Confirm This Ride To Start</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center  gap-3 '>
        <img className='h-12 w-12 rounded-full object-cover' src='data:image/jpeg;base64,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' alt='user'/>
        <h2 className='text-lg font-medium captalize'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2km</h5>
        
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">

        <div className="w-full mt-5">
          <div className="flex items-center gap-6  p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11/A</h3>
              <p className="text-sm font-medium -m1-1 text-gray-600">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">11/A</h3>
              <p className="text-sm font-medium -m1-1 text-gray-600">
              {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-5 ">
          <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm font-medium -mb-3 text-gray-600">
                Choose a Payment method
              </p>
            </div>
          </div>
        </div>
       
      <div className='mt-2 w-full'>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}> 
        <input type='text'
        value={otp}
        onChange={(e)=>
        {
          setOTP(e.target.value)
        }
        }
         className="px-6 py-4 text-lg font-mono w-full mb-5  rounded-lg bg-[#eee]" 
         placeholder='Enter OTP'/>
        <button onClick={()=>{
         props.setConfirmRidePopUp(false)
        }} className="w-full flex justify-center bg-green-600 mt-1 text-lg text-white font-semibold p-2 rounded-lg">
        Confirm
        </button>
        <button onClick={()=>{
          props.setConfirmRidePopUp(false)
          props.setRidePopUp(false)
        }} className="w-full bg-red-600 mt-1 text-lg text-white font-semibold p-2 rounded-lg">
         Cancel
        </button>
        </form>
      
      </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
