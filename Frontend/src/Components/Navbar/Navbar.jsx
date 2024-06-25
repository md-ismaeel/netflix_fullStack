import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import netflixPng from '../../assets/Navbar/netflix-1-logo-svg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/Slices/userSlice';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/axisConfig';
import { VscMenu } from "react-icons/vsc";
import { VscChromeClose } from 'react-icons/vsc';
import { IoSearchOutline } from 'react-icons/io5';
import '../Navbar/Navbar.css';

export const Navbar = () => {
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post('/logout');
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem('users');
                dispatch(setUser(null));

                navigate('/login');

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
            {/* large Screen */}
            <div className="nav-container w-full fixed z-50 min-h-[60px] flex justify-between items-center px-10 bg-black text-white border-b">
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

            {/* Small Screen */}
            <div className="nav-container-2 w-full fixed z-50 min-h-[60px] hidden justify-between items-center px-4 bg-black text-white border-b">
                <NavLink to={'/'}>
                    <img src={netflixPng} alt="N-png" className="mr-10 h-[30px] w-[30px]" />
                </NavLink>

                <div className='flex justify-center items-center'>
                    <div onClick={handleToggleSearch} className="flex justify-center items-center px-2 py-1 cursor-pointer">
                        {isSearchActive ? (
                            <NavLink to="/">
                                <VscChromeClose className="text-xl font-bold" />
                            </NavLink>
                        ) : (
                            <NavLink to="search">
                                <IoSearchOutline className="text-xl font-bold" />
                            </NavLink>
                        )}
                    </div>

                    <p className="px-4 py-1 rounded-sm font-semibold">{user?.fullName.toUpperCase()}</p>

                    <div onClick={handleToggleMenu} className="flex justify-center items-center px-2 py-1 cursor-pointer">
                        {isMenuOpen ? <VscChromeClose className="text-2xl font-bold" /> : <VscMenu className="text-2xl font-bold" />}
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed z-50 top-[60px] px-6 py-2 right-0 w-[50%] bg-black text-white flex flex-col justify-center items-start">
                    <NavLink to={'/'} className="py-2 text-lg" onClick={handleToggleMenu}>
                        Home
                    </NavLink>
                    <NavLink to={'/movies'} className="py-2 text-lg" onClick={handleToggleMenu}>
                        Movies
                    </NavLink>
                    <NavLink to={'/tv-shows'} className="py-2 text-lg" onClick={handleToggleMenu}>
                        TV Shows
                    </NavLink>
                    <NavLink to={'/watch-list'} className="py-2 text-lg" onClick={handleToggleMenu}>
                        Watch List
                    </NavLink>
                    <button onClick={handleLogout} className="bg-pink-700 px-4 py-1 rounded-md font-semibold mt-2 mb-2">
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};
