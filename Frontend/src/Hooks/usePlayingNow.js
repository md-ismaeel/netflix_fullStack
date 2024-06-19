import { useEffect } from 'react'
import { API_PLAYING_NOW, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setPlayMovies } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const usePlayingNow = () => {

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(API_PLAYING_NOW, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setPlayMovies(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return () => {
            dispatch(setPlayMovies([]))
        }
    }, [])
}
