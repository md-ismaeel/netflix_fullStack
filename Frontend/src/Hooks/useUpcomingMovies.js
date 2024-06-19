import { useEffect } from 'react'
import { API_UPCOMING, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setUpcomingMovies } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const useUpcomingMovies = () => {

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(API_UPCOMING, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setUpcomingMovies(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return () => {
            dispatch(setUpcomingMovies([]))
        }
    }, [])
}
