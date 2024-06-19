import React from 'react'
import { VideoBackground } from '../../Components/Videos/VideoBackground'
import { VideoTitle } from '../../Components/Videos/VideoTitle'
import { useSelector } from 'react-redux'
import { MovieList } from '../../Components/MovieList'

export const Home = () => {
    const { popularMovies, playMovies, toRatedMovies, upcomingMovies, trendingMovies } = useSelector((state) => state.movieSlice)
    return (
        <>
            <div className='w-full aspect-video'>
                <VideoBackground />
                {/* <VideoTitle /> */}
                <div className='mt-[-380px]'>
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

