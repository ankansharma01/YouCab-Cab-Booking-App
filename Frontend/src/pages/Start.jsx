import React from "react";
import { Link } from "react-router-dom";
import logo from '../CAB.png'

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-9  w-full flex justify-between flex-col">
        <img className='w-28 -mt-5 ml-1'src={logo}/>
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rouded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
