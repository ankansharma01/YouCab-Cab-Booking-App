import React from 'react';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  if (!ride) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading ride details...</p>
      </div>
    );
  }

  const captainName = ride.captain?.fullname?.firstname || 'Captain';
  const vehiclePlate = ride.captain?.vehicle?.plate || 'Loading...';
  const vehicleModel = ride.captain?.vehicle?.model || 'Vehicle details loading...';
  
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
        onClick={() => setWaitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12 ml-6"
          src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
          alt="car-image"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{captainName}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{vehiclePlate}</h4>
          <p className="text-sm text-gray-600">{vehicleModel}</p>
          {ride.otp && (
            <h5 className="text-lg font-semibold">Your OTP - {ride.otp}</h5>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-6 p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Location</h3>
              <p className="text-sm font-medium text-gray-600">
                {ride.pickup || 'Loading...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-5 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm font-medium text-gray-600">
                {ride.destination || 'Loading...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-5">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{ride.fare || 'Calculating...'}
              </h3>
              <p className="text-sm font-medium -mb-3 text-gray-600">
                Choose a Payment method
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;