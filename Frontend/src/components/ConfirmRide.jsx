import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center  absolute top-0  w-[93%]  "
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20 ml-6"
          src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
          alt="car-image"
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-6  p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11/A</h3> */}
              <p className="text-sm font-medium -m1-1 text-gray-600">
              {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11/A</h3> */}
              <p className="text-sm font-medium -m1-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-5 ">
          <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm font-medium -mb-3 text-gray-600">
                Choose a Payment method
              </p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
          props.setVehicleFound(true)
         props.setConfirmRidePanel(false)
         props.createRide()
        }} className="w-full bg-green-600 mt-5 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
