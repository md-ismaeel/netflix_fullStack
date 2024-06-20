import React from 'react'

export const SearchResults = () => {
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-start pt-32 text-white'>
                <input type='text' placeholder='Enter Movies Name' className='w-1/2 h-12 bg-slate-700 rounded-md px-10' />
                <button className='h-12 bg-pink-700 px-8 rounded-md font-semibold ml-6'>Search</button>
            </div>
        </>
    )
}

