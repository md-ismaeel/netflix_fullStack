import { useEffect } from 'react'
import { API_POPULAR, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setPopularMovies } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const usePopularMovies = () => {

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(API_POPULAR, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setPopularMovies(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return ()=> {
            dispatch(setPopularMovies([]))
        }
    }, [])
}
