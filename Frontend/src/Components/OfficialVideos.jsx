import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import noPosterPng from "../assets/no-poster.png";
import { CiPlay1 } from 'react-icons/ci';
import { VideoModal } from './VideoModel';




export const OfficialVideos = () => {

    const { videos } = useSelector((state) => state.movieSlice);
    const [selectedVideoKey, setSelectedVideoKey] = useState(null);

    const openVideoModal = (videoKey) => {
        setSelectedVideoKey(videoKey);
    };

    const closeVideoModal = () => {
        setSelectedVideoKey(null);
    };

    return (
        <>
            {videos.length !== 0 && (
                <div className='w-full px-12 mt-10'>
                    <h1 className='text-2xl'>Official Videos</h1>
                    <div id='profile' className='w-full flex justify-start items-center gap-6 mt-4 overflow-scroll'>

                        {videos.map((video) => (
                            <div key={video.id} className='flex flex-col justify-start items-center w-[300px] h-[400px]'>

                                <div className='w-[270px] h-[160px] relative'>
                                    <NavLink onClick={() => openVideoModal(video.key)}>

                                        <img
                                            src={video.key ? `https://img.youtube.com/vi/${video.key}/mqdefault.jpg` : noPosterPng}
                                            className='w-[100%] h-[100%] rounded bg-cover'
                                            alt=''
                                        />
                                        <span className="h-[50px] w-[50px] text-3xl rounded-full absolute top-[35%] right-[35%] flex justify-center items-center border-2 hover:border-pink-700 hover:text-pink-700 cursor-pointer opacity-100">
                                            <CiPlay1 className="z-2" />
                                        </span>

                                    </NavLink>

                                </div>

                                <p className='w-full flex justify-start items-center mt-4'>{video.name || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedVideoKey && (
                <VideoModal videoKey={selectedVideoKey} onClose={closeVideoModal} />
            )}
        </>
    );
};


