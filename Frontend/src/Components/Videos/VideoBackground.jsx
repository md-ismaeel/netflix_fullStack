import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestOptions } from '../../utils/endPoints';
import { setTrailer } from '../../Redux/Slices/movieSlice';
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import "../Videos/VideosBackGround.css"


export const VideoBackground = () => {

    const { popularMovies } = useSelector((state) => state.movieSlice);
    const [videoUrl, setVideoUrl] = useState("");
    const [randomMovie, setRandomMovie] = useState(null);

    const dispatch = useDispatch();
    const defaultKey = 'hwNWx1GTSKo';

    const fetchTrailer = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, getRequestOptions);
            // console.log(response.data.results);
            const trailers = response.data.results;

            if (trailers.length > 0) {
                const randomTrailer = trailers[Math.floor(Math.random() * trailers.length)];
                const videoKey = randomTrailer.key || defaultKey;

                setVideoUrl(`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&cc_load_policy=0`);
                dispatch(setTrailer(trailers));
            } else {
                setVideoUrl(`https://www.youtube.com/embed/${defaultKey}?autoplay=1&mute=1&loop=1&playlist=${defaultKey}&cc_load_policy=0`);
                dispatch(setTrailer([]));
            }
        } catch (err) {
            console.error("Error occurred while fetching API", err);
            setVideoUrl(`https://www.youtube.com/embed/${defaultKey}?autoplay=1&mute=1&loop=1&playlist=${defaultKey}&cc_load_policy=0`);
        }
    };

    useEffect(() => {

        if (popularMovies && popularMovies.length > 0) {
            const randomMovieIndex = Math.floor(Math.random() * popularMovies.length);
            const selectedMovie = popularMovies[randomMovieIndex];
            setRandomMovie(selectedMovie);
            fetchTrailer(selectedMovie.id);
        }

        return () => {
            dispatch(setTrailer([]));
        };
    }, [popularMovies, dispatch]);


    return (
        <>
            <div className="relative  w-full h-full overflow-hidden">
                {videoUrl && (
                    <iframe
                        className="w-full h-full"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
            {randomMovie && (

                <div className='w-[vw] absolute text-white top-20 left-6 z-20'>
                    <h1 className='text-3xl font-bold'>{randomMovie.title.toUpperCase()}</h1>
                    <p className='overview w-1/3 mt-4'>
                        {randomMovie.overview.split(' ').slice(0, 30).join(' ')}{randomMovie.overview.split(' ').length > 30 && '...'}
                    </p>

                    <div className='flex mt-8'>

                        <button className='flex items-center px-6 py-2 bg-white text-black rounded-md hover:bg-opacity-80'>
                            <span><CiPlay1 /></span>
                            <span className='ml-1'>Play</span>
                        </button>
                        <button className='flex mx-2 items-center px-6 py-2 bg-gray-500 bg-opacity-90 text-black rounded-md'>
                            <span><MdOutlineWatchLater /></span>
                            <span className='ml-1'>Watch more</span>
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};
