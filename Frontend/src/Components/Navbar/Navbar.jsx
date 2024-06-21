import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import netflixPng from "../../assets/Navbar/netflix-1-logo-svg.svg"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API_END_POINT } from '../../utils/endPoints'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../Redux/Slices/userSlice'
import { CiSearch } from "react-icons/ci";
import { GiCancel } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import "../Navbar/Navbar.css"
import { toast } from "react-toastify"
import { axiosInstance } from '../../utils/axisConfig'

export const Navbar = () => {

    const { user } = useSelector((state) => state.userSlice);
    // console.log(user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isTrue, setIsTrue] = useState(false)
    const [isMenu, setIsMenu] = useState(null)

    const handleToggle = () => {
        setIsTrue((prev) => !prev)
    }

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post('/logout')
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(null));
                navigate("/login");
            } else {
                toast.success("Failed to log out. Please try again.")
            }
        } catch (err) {
            console.log('Error occurred while logout', err);
        }
    };

    return (
        <>
            <div className='container w-full fixed z-50 min-h-[60px] flex justify-between items-center px-10 bg-black text-white border-b'>

                <div className='flex justify-between items-center '>

                    <NavLink to={'/'}>
                        <img src={netflixPng} alt='N-png' className='mr-10 h-[30px] w-[30px]' />
                    </NavLink>

                    <ul className='flex justify-center items-center gap-10 text-lg'>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Home</NavLink>
                        <NavLink to={'movies'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Movies</NavLink>
                        <NavLink to={'tv-shows'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Tv Shows</NavLink>
                        <NavLink to={'watch-list'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Watch List</NavLink>
                    </ul>

                </div>

                <div className='flex justify-center items-center gap-4'>

                    <div onClick={handleToggle}>
                        {isTrue ? <NavLink to='/'><GiCancel className='text-2xl font-bold' /></NavLink> : <NavLink to='search'><CiSearch className='text-2xl font-bold' /></NavLink>}
                    </div>
                    <p>{user?.fullName}</p>
                    <button onClick={handleLogout} className='bg-pink-700 px-4 py-1 rounded-md'>Logout</button>
                </div>

            </div>

            <div className='container-2 hidden w-full fixed z-50 min-h-[60px] justify-between items-center px-10 bg-black text-white border-b'>
                <NavLink to={'/'}>
                    <img src={netflixPng} alt='N-png' className='mr-10 h-[30px] w-[30px]' />
                </NavLink>

                <div className='flex justify-center items-center gap-4'>

                    <div onClick={handleToggle}>
                        {isTrue ? <NavLink to='/'><GiCancel className='text-2xl font-bold' /></NavLink> : <NavLink to='search'><CiSearch className='text-2xl font-bold' /></NavLink>}
                    </div>
                    <p>{user?.fullName}</p>
                    <button onClick={handleLogout} className='bg-pink-700 px-4 py-1 rounded-md'>Logout</button>
                </div>
                {/* <ul className='flex justify-center items-center gap-10 text-lg'>
                    <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Home</NavLink>
                    <NavLink to={'movies'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Movies</NavLink>
                    <NavLink to={'tv-shows'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Tv Shows</NavLink>
                    <NavLink to={'watch-list'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Watch List</NavLink>
                </ul> */}
            </div>
        </>
    )
}

