import { useEffect } from 'react'
import { API_TRENDING, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setTrendingMovies } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const useTrendingMovies = () => {

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(API_TRENDING, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setTrendingMovies(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return () => {
            dispatch(setTrendingMovies([]))
        }
    }, [])
}
