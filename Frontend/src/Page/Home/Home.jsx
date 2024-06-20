import React from 'react'
import { VideoBackground } from '../../Components/Videos/VideoBackground'
import { useSelector } from 'react-redux'
import { MovieList } from '../../Components/MovieList'

export const Home = () => {
    const { popularMovies, playMovies, toRatedMovies, upcomingMovies, trendingMovies } = useSelector((state) => state.movieSlice)
    return (
        <>
            <div className='w-full aspect-video'>
                <VideoBackground />
                <div className='mt-[-350px]'>
                    <MovieList title={'PlayNow Movies'} movies={playMovies} />
                    <MovieList title={'Trending Movies'} movies={trendingMovies} />
                    <MovieList title={'TopRated Movies'} movies={toRatedMovies} />
                    <MovieList title={'Popular Movies'} movies={popularMovies} />
                    <MovieList title={'Upcoming Movies'} movies={upcomingMovies} />
                </div>

            </div>
        </>
    )
}

