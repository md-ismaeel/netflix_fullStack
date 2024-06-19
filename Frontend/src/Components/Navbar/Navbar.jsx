import React from 'react'
import { NavLink } from 'react-router-dom'
import netflixPng from "../../assets/Navbar/netflix-1-logo-svg.svg"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API_END_POINT } from '../../utils/endPoints'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../Redux/Slices/userSlice'

export const Navbar = () => {

    const { user } = useSelector((state) => state.userSlice);
    // console.log(user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            console.log(res);

            if (res.data.success) {
                alert(res.data.message);
                dispatch(setUser({ user: null }));
                navigate("/");
            } else {
                alert("Failed to log out. Please try again.");
            }
        } catch (err) {
            console.log('Error occurred while logout', err);
        }
    };

    return (
        <>
            <div className='w-full fixed z-50 min-h-[60px] flex justify-between items-center px-10 bg-black text-white border-b'>

                <div className='flex justify-between items-center '>

                    <NavLink to={'/'}>
                        <img src={netflixPng} alt='N-png' className='mr-10 h-[30px] w-[30px]' />
                    </NavLink>

                    <ul className='flex justify-center items-center gap-10 text-lg'>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Home</NavLink>
                        <NavLink to={'movies'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Movies</NavLink>
                        <NavLink to={'tv-shows'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Tv Shows</NavLink>
                        <NavLink to={'my-list'} className={({ isActive }) => isActive ? 'text-yellow-500' : 'hover:text-yellow-500'}>Watch List</NavLink>
                    </ul>

                </div>

                <div className='flex justify-center items-center gap-4'>
                    <p>{user?.fullName}</p>
                    <button onClick={handleLogout}>LogOut</button>
                </div>

            </div>
        </>
    )
}

