import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noPosterImg from "../assets/no-poster.png";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CiPlay1 } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { VideoModal } from "../Components/VideoModel";
import { API_TMDB_URL } from "../utils/endPoints";
import "../Components/MovieCardDetails.css"
import { setMyList } from "../Redux/Slices/userSlice";

export const MovieCardDetails = () => {

    const dispatch = useDispatch()
    const { myList } = useSelector((state) => state.userSlice);

    console.log("myList", myList);;


    const { movieDetails, credits, videos } = useSelector((state) => state.movieSlice);


    const {
        backdrop_path,
        genres,
        overview,
        poster_path,
        release_date,
        runtime,
        status,
        tagline,
        title,
        vote_average,
        first_air_date,
        original_name,
    } = movieDetails;

    const filteredDirector = credits?.crew?.filter((e) => e.department === 'Directing') || [];
    const filteredWriter = credits?.crew?.filter((e) => e.department === 'Writing') || [];
    const formattedVoteAverage = typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A';

    const [selectedVideoKey, setSelectedVideoKey] = useState(null);
    const slicedVideos = videos?.length > 0 ? videos.slice(0, 1) : [];

    const openVideoModal = (videoKey) => {
        setSelectedVideoKey(videoKey);
    };

    const closeVideoModal = () => {
        setSelectedVideoKey(null);
    };

    const handleWatchList = () => {
        // setMyList()
        console.log('working watchList');
    }

    return (
        <>
            <div className={`main-container w-full min-h-screen`} style={{
                backgroundImage: backdrop_path ? `linear-gradient(to top, rgba(0,0,0,10) 50%, transparent 100%), url(${API_TMDB_URL}${backdrop_path})` : '',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                {movieDetails && (
                    <div className="details-container w-full h-full flex justify-center items-center px-0 pt-32">

                        <div className="poster-box w-2/5 h-[550px] px-12">
                            <img
                                src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : noPosterImg}
                                className="w-96 h-full object-center rounded-xl mb-1"
                                alt={title || original_name || "No poster available"}
                            />
                        </div>

                        <div className="name-tittle w-1/2">
                            <h1 className="text-4xl">
                                {title || original_name}{" "}
                                {release_date || first_air_date ? `(${(release_date || first_air_date).slice(0, 4)})` : ""}
                            </h1>

                            <p className="text-xl italic mt-1 opacity-40">{tagline || "N/A"}</p>

                            <div className="genres flex justify-start items-center gap-4 mt-2">
                                {genres?.map((genre, index) => (
                                    <p key={index} className="bg-pink-700 px-4 py-1 rounded-md">{genre.name || "N/A"}</p>
                                ))}
                            </div>

                            <div className="flex justify-start items-center gap-10 mt-4">
                                <div style={{ background: 'white', borderRadius: '50%', width: '70px', height: '70px' }}>
                                    <CircularProgressbar
                                        className="h-full w-full"
                                        value={Math.trunc(Number(vote_average) * 10)}
                                        text={`${formattedVoteAverage}%`}
                                        styles={buildStyles({
                                            rotation: 0.25,
                                            strokeLinecap: 'butt',
                                            textSize: '24px',
                                            pathTransitionDuration: 0.5,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: 'transparent',
                                        })}
                                    />
                                </div>

                                <div className="flex justify-start items-center gap-4">
                                    {slicedVideos.map((video) => (
                                        <NavLink key={video.key} onClick={() => openVideoModal(video.key)}>
                                            <span className="h-[70px] w-[70px] text-4xl rounded-full relative flex justify-center items-center border-2 hover:border-pink-700 hover:text-pink-700 cursor-pointer">
                                                <CiPlay1 className="absolute z-2" />
                                            </span>
                                        </NavLink>
                                    ))}

                                    <span className="text-xl text-white hover:text-pink-700"> Watch trailer</span>
                                    <button onClick={() => handleWatchList()} className="bg-pink-700 px-3 py-1 rounded-md">Watch List</button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-2xl">Overview</h2>
                                <p>{overview || "N/A"}</p>
                            </div>

                            <div className="release-container flex justify-start items-center gap-10 mt-6">
                                <div className="flex gap-2">
                                    <span className="text-lg">Status:</span>
                                    <span className="opacity-50">{status || 'N/A'}</span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-lg">Release Date:</span>
                                    <span className="opacity-50">{release_date || 'N/A'}</span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-lg">Runtime:</span>
                                    <span className="opacity-50">{runtime ? `${runtime}m` : 'N/A'}</span>
                                </div>
                            </div>

                            <hr className="opacity-20 mt-2" />

                            {credits.crew?.length > 0 ? (
                                <div className="mt-4">
                                    {filteredDirector.length > 0 && (
                                        <>
                                            <p className="flex gap-4">
                                                <span className="text-lg">Director:</span>
                                                {filteredDirector.slice(0, 2).map((director, index) => (
                                                    <span key={index} className="opacity-50">{director.name}</span>
                                                ))}
                                            </p>
                                            <hr className="opacity-20 mt-2" />
                                        </>
                                    )}

                                    {filteredWriter.length > 0 && (
                                        <>
                                            <div className="flex gap-3 mt-4">
                                                <span className="text-lg">Writer:</span>
                                                {filteredWriter.slice(0, 2).map((writer, index) => (
                                                    <span key={index} className="opacity-50">{writer.name}</span>
                                                ))}
                                            </div>
                                            <hr className="opacity-20 mt-2" />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="flex gap-3 mt-4">
                                        <span className="text-lg">Creator:</span>
                                        {credits.cast?.slice(0, 2).map((elem, index) => (
                                            <span key={index} className="opacity-50">{elem.name || "N/A"}</span>
                                        ))}
                                    </div>
                                    <hr className="opacity-20 mt-2" />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {selectedVideoKey && (
                <VideoModal videoKey={selectedVideoKey} onClose={closeVideoModal} />
            )}
        </>
    );
};

