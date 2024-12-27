import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center  absolute top-0  w-[93%]  " onClick={()=>{
          props.setVehiclePanel(false)
        }} >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
        </h5>
        <h2 className="text-xl font-semibold mb-5">Choose a vehicle</h2>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.setVehicleType('car')

        }} className=" mb-3 w-full flex items-center justify-between p-3 border-2 active:border-black  rounded-2xl">
          <img
            className="h-11"
            src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
            alt=""
          />
          <div className="-ml-1 w-1/2">
            <h4 className="font-medium text-base">
              UberGo
              <span>
                <i className="ri-user-line"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins aways</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable,compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
            props.setVehicleType('auto')

            props.setConfirmRidePanel(true)
        }} className=" mb-3 w-full flex items-center justify-between p-3 border-2 active:border-black  rounded-2xl">
          <img
            className="h-11"
            src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
            alt=""
          />
          <div className="-ml-1 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-line"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins aways</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable,compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.setVehicleType('motorcycle')

        }} className=" mb-3 w-full flex items-center justify-between p-3 border-2 active:border-black  rounded-2xl">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base">
              UberMoto{" "}
              <span>
                <i className="ri-user-line"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">5 mins aways</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable,Motorcycle ride
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.motorcycle}</h2>
        </div>
      </div> 
 
  )
}

export default VehiclePanel
