import React from "react";
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authservice from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom';

export default function  LogoutBtn() {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const LogoutHandler = () => {
        authservice.logout() 
        .then(()=> {
            dispatch(logout())
            navigate('/login');  
        })
    }
    return(
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={LogoutHandler}
        >Logout</button>

    )
}