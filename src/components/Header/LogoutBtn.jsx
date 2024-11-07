import React from "react";
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authservice from '../../appwrite/auth'

export default function  LogoutBtn() {
    const dispatch=useDispatch()
    const LogoutHandler = () => {
        authservice.logout()
        .then(()=> {
            dispatch(logout())
        })
    }
    return(
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={LogoutHandler}
        >Logout</button>

    )
}