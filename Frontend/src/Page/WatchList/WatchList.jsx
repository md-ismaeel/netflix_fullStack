import React from 'react'
import { CirclesWithBarSpinner } from '../../Components/Loader'

export const WatchList = () => {
    return (
        <>
            <div className='w-full min-h-screen pt-20 text-white'>
                watch List
                <CirclesWithBarSpinner />
            </div>
        </>
    )
}