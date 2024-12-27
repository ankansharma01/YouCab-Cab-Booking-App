import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((res)=>{
        if(res.status===200)
        {
          localStorage.removeItem('captain-token')
          navigate('/')
        }
    })
  return (
    <div>
      Logged Out
    </div>
  )
}

export default CaptainLogout
