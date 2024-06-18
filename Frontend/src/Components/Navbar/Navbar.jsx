import React from 'react'
import { NavLink } from 'react-router-dom'
import netflixPng from "../../assets/Navbar/netflix-1-logo-svg.svg"

export const Navbar = () => {
    return (
        <>
            <div className='w-full min-h-[60px] flex justify-between items-center px-10 bg-black text-white'>

                <div className='flex justify-between items-center '>

                    <img src={netflixPng} alt='N-png' className='mr-10 h-[30px] w-[30px]' />

                    <ul className='flex justify-center items-center gap-6'>
                        <NavLink to={'main'}>Home</NavLink>
                        <NavLink to={'movie'}>TV Shows</NavLink>
                        <NavLink to={'tv-show'}>Movies</NavLink>
                        <NavLink to={'my-list'}>My List</NavLink>
                    </ul>

                </div>

                <div className='flex justify-center items-center gap-4'>
                    <p>Ismail</p>
                    <p>LogOut</p>
                </div>

            </div>
        </>
    )
}

