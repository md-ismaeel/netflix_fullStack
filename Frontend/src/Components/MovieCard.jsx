import React, { useMemo } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useSelector } from 'react-redux';
import { API_TMDB_URL } from '../utils/endPoints';
import noPosterPng from '../assets/no-poster.png';

export const MovieCard = ({ item }) => {
    const {
        genre_ids = [],
        poster_path,
        title,
        name,
        release_date,
        first_air_date,
        vote_average,
    } = item;

    const genres = useSelector((state) => state.movieSlice.genres) || [];

    const filteredGenres = genre_ids.map(genresId => {
        const matchedGenre = genres.find(genre => genre.value === genresId);
        return matchedGenre ? matchedGenre.label : null;
    }).filter(Boolean)

    let slicedGenres = filteredGenres.slice(0, 1)

    const formattedVoteAverage = useMemo(() =>
        typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A',
        [vote_average]
    );

    return (
        <div className='w-[220px] rounded-md mt-4 mb-10 relative hover:opacity-50 ease-linear duration-300'>
            <img
                src={poster_path ? `${API_TMDB_URL}/${poster_path}` : noPosterPng}
                alt={title || name || 'No Poster'}
                className='w-full min-h-60 rounded-xl mb-1'
            />
            <div className='absolute left-2 bottom-16'>
                <div style={{ background: 'white', borderRadius: '50%', width: '48px', height: '48px' }}>
                    <CircularProgressbar
                        className='h-full w-full'
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
            </div>
            <div className='absolute right-2 bottom-20 flex flex-col gap-1'>
                {slicedGenres && slicedGenres.map((genre, index) => (
                    <p key={index} className='bg-pink-700 text-white px-2 py-1 rounded-sm text-xs'>
                        {genre}
                    </p>
                ))}
            </div>
            <div className='text-white'>
                <h1 className='text-xl mt-4'>
                    {(title || name)?.length >= 20 ? `${(title || name).slice(0, 20)}...` : title || name}
                </h1>
                <p className='mt-1 opacity-60 text-sm'>{release_date || first_air_date}</p>
            </div>
        </div>
    );
};
