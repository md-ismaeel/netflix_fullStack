import React from 'react'
import { CirclesWithBarSpinner } from '../../Components/Loader'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MovieCard } from "../../Components/MovieCard"

export const WatchList = () => {
    const { addToList } = useSelector((state) => state.userSlice)
    return (
        <>
            <div className='w-full flex flex-col justify-center py-4 px-6 pt-12'>

                <div className='w-full min-h-screen flex justify-start items-center'>
                    {!addToList?.length > 0 ? (
                        <div className='w-full flex flex-col gap-10 justify-center items-center'>
                            <div className='text-2xl font-semibold text-teal-400'>List is Empty!</div>
                            <CirclesWithBarSpinner />
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <h1 className='text-white text-2xl font-semibold'>WatchLists</h1><br />
                            <div className='card-box w-full flex flex-wrap justify-start items-center gap-10'>
                                {addToList && addToList.map((item) => (
                                    <NavLink key={item.id} to={`/movie/${item.id}`} className=''>
                                        <MovieCard item={item} />
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}