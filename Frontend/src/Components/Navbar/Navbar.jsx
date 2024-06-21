import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import netflixPng from '../../assets/Navbar/netflix-1-logo-svg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/Slices/userSlice';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/axisConfig';
import { VscChromeClose } from 'react-icons/vsc';
import { IoSearchOutline } from 'react-icons/io5';
import '../Navbar/Navbar.css';

export const Navbar = () => {
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleToggleSearch = () => {
        setIsSearchActive((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post('/logout');
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem('users');
                dispatch(setUser(null));
                if (user === null) {
                    navigate('/login');
                }
            } else {
                toast.error('Failed to log out. Please try again.');
            }
        } catch (err) {
            console.log('Error occurred while logout', err);
            toast.error(err.response.data.message);
        }
    };

    return (
        <>
            <div className="container w-full fixed z-50 min-h-[60px] flex justify-between items-center px-10 bg-black text-white border-b">
                <div className="flex justify-between items-center">
                    <NavLink to={'/'}>
                        <img src={netflixPng} alt="N-png" className="mr-10 h-[30px] w-[30px]" />
                    </NavLink>
                    <ul className="flex justify-center items-center gap-10 text-lg">
                        <NavLink to={'/'} className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}>
                            Home
                        </NavLink>
                        <NavLink to={'/movies'} className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}>
                            Movies
                        </NavLink>
                        <NavLink to={'/tv-shows'} className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}>
                            Tv Shows
                        </NavLink>
                        <NavLink to={'/watch-list'} className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}>
                            Watch List
                        </NavLink>
                    </ul>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <div onClick={handleToggleSearch} className="flex justify-center items-center px-2 py-1">
                        {isSearchActive ? (
                            <NavLink to="/">
                                <VscChromeClose className="text-2xl font-bold" />
                            </NavLink>
                        ) : (
                            <NavLink to="search">
                                <IoSearchOutline className="text-2xl font-bold" />
                            </NavLink>
                        )}
                    </div>
                    <p className="px-4 py-1 rounded-sm font-semibold">{user?.fullName.toUpperCase()}</p>
                    <button onClick={handleLogout} className="bg-pink-700 px-4 py-1 rounded-md font-semibold">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
