import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { useEffect, useContext } from "react";
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopUp, setRidePopUp] = useState(false);
  const ridePopUpRef = useRef(null);
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);
  const confirmRidePopUpRef = useRef(null);
  const [ ride, setRide ] = useState(null)


  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    console.log(captain);

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({userId: captain._id,
          //   location: {
          //           ltd: position.coords.latitude,
          //           lng: position.coords.longitude
          //   }
          // });

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval)
  }, [captain]);
 
  socket.on("new-ride", (data) => {
    console.log(data); 
    setRide(data);
    setRidePopUp(true); 
  });


  async function confirmRide() {

     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId: ride._id,
        captainId: captain._id,
 

    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(response);
    
  }


  useGSAP(
    function () {
      if (ridePopUp) {
        gsap.to(ridePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUp]
  );

  useGSAP(
    function () {
      if (confirmRidePopUp) {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUp]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"
          alt=""
        />
        <Link
          to="/captain-login"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="fixed h-10 w-10 flex items-center justify-center rouded-full"></div>
      <div className="h-3/5 ">
        <img
          className="h-full w-full object-cover"
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
          alt=""
        />
      </div>
      <div className="h-2/5 p-5">
        <CaptainDetails
          setRidePopUp={setRidePopUp}
          setConfirmRidePopUp={setConfirmRidePopUp}
        />
      </div>
      <div
        ref={ridePopUpRef}
        className="fixed w-full z-10 bottom-0 translate-y-full mt-4 bg-white p-3 py-6 px-3 pt-12"
      >
        <RidePopup
          ride={ride}
          setRidePopUp={setRidePopUp}
          setConfirmRidePopUp={setConfirmRidePopUp}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopUpRef}
        className="fixed w-full z-10 bottom-0   bg-white p-3 py-6 px-3 pt-12 h-screen"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUp={setConfirmRidePopUp}
          setRidePopUp={setRidePopUp}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
