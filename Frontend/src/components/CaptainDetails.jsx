import React, { useEffect, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainDetails = (props) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data);
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);
      }
    };

    fetchCaptainProfile();
  }, [setCaptain]);

  if (!captain || Object.keys(captain).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img
            className='h-10 w-10 rounded-full object-cover'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h4 className='text-lg font-medium capitalize'>
            {captain.fullname?.firstname} {captain.fullname?.lastname}
          </h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className="text-3xl mb-1 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-1 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-1 font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
      </div>
      <div className='flex justify-center mt-2'>
        <button
          onClick={() => {
            props.setRidePopUp(true);
          }}
          className='w-[50%] bg-green-600 mt-1 text-white font-semibold p-2 rounded-lg'
        >
          New Rides
        </button>
      </div>
    </div>
  );
};

export default CaptainDetails;