import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios'
import {userDataContext} from "../context/UserContext";
import logo from '../CAB.png'

const UserSignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {user,setUser} = useContext(userDataContext)

  const submitHandle = async(e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
   if(response.status == 201)
   {
     const data = response.data
     setUser(data.user)
     localStorage.setItem('token',response.data.token)
     navigate('/home')
   }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          
          <img
            className="w-24 mb-10 "
            src={logo}
          />

          <form
            onSubmit={(e) => {
              submitHandle(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's Your Name?</h3>
            <div className="flex gap-4 mb-5">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base "
                type="text"
                placeholder="First name"
                required
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
              <input
                className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base "
                type="text"
                placeholder="Last name"
                required
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's Your Email?</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              type="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm "
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ">
              Sign Up
            </button>

            <p className="text-center">
              Account already exists?
              <Link to="/login" className="text-blue-600">
                Login Here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            By proceeding,you consent to get calls,Whatsapp or SMS
            message,including by automated means,from UBER and its affiliates to
            the number provided
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
