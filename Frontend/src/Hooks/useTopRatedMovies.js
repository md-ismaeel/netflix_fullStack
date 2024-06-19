import { useEffect } from 'react'
import { API_PLAYING_NOW, API_TOP_RATED, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setTopRatedMovies } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const useTopRatedMovies = () => {

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(API_TOP_RATED, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setTopRatedMovies(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return () => {
            dispatch(setTopRatedMovies([]))
        }
    }, [])
}
