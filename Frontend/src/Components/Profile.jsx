import React from 'react'
import { useSelector } from "react-redux";
import profileImg from '../assets/avatar.png'

export const Profile = () => {
    const { credits } = useSelector((state) => state.movieSlice);
    // console.log(credits);

    const filteringData = credits && credits.cast ? credits.cast.map((elem) => ({
        profile_path: elem.profile_path,
        name: elem.name,
        character: elem.character
    })) : [];

    // console.log(filteringData);

    return (
        <div className='mb-10'>
            {filteringData.length > 0 ?
                <>
                    <div className='w-full px-12 mt-20'>
                        <h1 className='text-2xl font-semibold'>Top Cast</h1>

                        <div id='profile' style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'start', alignItems: 'start', overflowX: 'scroll', gap: '2.2rem' }}>
                            {filteringData && filteringData.map((e, i) => (

                                <div key={i} style={{ width: '350px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '200px', height: '200px' }}>
                                        <img src={e.profile_path ? `https://image.tmdb.org/t/p/original/${e.profile_path}` : profileImg}
                                            alt={e.name || "No poster available"}
                                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                        />
                                    </div>

                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <p className='text-xl font-bold'>{e.name}</p>
                                        <p className='text-lg opacity-50'>{e.character}</p>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </> : ""
            }
        </div>


    )
}
