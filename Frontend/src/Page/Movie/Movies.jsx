import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../Redux/Slices/movieSlice';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { getRequestOptions } from '../../utils/endPoints';
import { MovieCard } from '../../Components/MovieCard';
import { CirclesWithBarSpinner } from '../../Components/Loader';
import "../Movie/Movie.css"


export const Movies = () => {
    const { movies, genres } = useSelector((state) => state.movieSlice);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedBySortOption, setSelectedBySortOption] = useState(null);

    const sortBy = [
        { defaultValue: null, label: "Select" },
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'vote_average.desc', label: 'Rating Descending' },
        { value: 'vote_average.asc', label: 'Rating Ascending' },
        { value: 'primary_release_date.desc', label: 'Release Date Descending' },
        { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
        { value: 'original_title.asc', label: 'Title A-Z' },
    ];

    const fetchData = async () => {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, getRequestOptions);
        dispatch(setMovies(response.data.results));
        setTotalPage(response.data.total_pages);
        setIsLoading(false);
    };

    const fetchMoviePerPage = async () => {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}`, getRequestOptions);
        const newMovies = [...movies, ...response.data.results];
        dispatch(setMovies(newMovies));
        setPage(prev => prev + 1);
        setIsLoading(false);
    };

    const fetchFilteredMovie = async () => {
        let params = "";
        if (selectedOption && selectedOption.length > 0) {
            selectedOption.forEach((item) => {
                params += item.value + ",";
            });
        }

        const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${params}`, getRequestOptions);
        dispatch(setMovies(data.data.results));
        setTotalPage(data.data.total_pages);
    };

    const sortByFilter = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=${selectedBySortOption.value}`, getRequestOptions);
        dispatch(setMovies(data.data.results));
        setTotalPage(data.data.total_pages);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedOption) {
            fetchFilteredMovie();
        }
        if (selectedBySortOption) {
            sortByFilter();
        }
    }, [selectedOption, selectedBySortOption]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (page <= totalPage && !isLoading) {
                fetchMoviePerPage();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, totalPage, isLoading]);

    return (
        <div className='w-full flex flex-col justify-center py-4 px-6 pt-20'>
            <div className='explore-movie w-full flex justify-between items-center mt-4 mb-1 px-3'>
                <h1 className='ab w-2/12 text-2xl text-white'>Explore Movies</h1>
                <div className='ab w-2/3 flex justify-end items-center gap-4'>
                    <Select
                        className='select-box bg-search-bar h-10 w-2/6 rounded-full outline-none'
                        type='text'
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e)}
                        isMulti
                        options={genres}
                    />
                    <Select
                        className='select-box bg-search-bar h-10 w-2/6 rounded-full outline-none'
                        type='text'
                        value={selectedBySortOption}
                        onChange={(e) => setSelectedBySortOption(e)}
                        options={sortBy}
                    />
                </div>
            </div>

            <div className='w-full min-h-screen flex justify-start items-center'>
                {isLoading ? (
                    <CirclesWithBarSpinner />
                ) : (
                    <div className='card-box w-full flex flex-wrap justify-between items-center'>
                        {movies.map((item) => (
                            <NavLink key={item.id} to={`/movie/${item.id}`} className=''>
                                <MovieCard item={item} />
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

