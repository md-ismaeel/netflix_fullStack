import React from 'react'
import { useEffect } from 'react'
import { getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setVideos } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';


export const useVideos = () => {

    const { id } = useParams()
    const { pathname } = useLocation()
    const location = pathname.split('/')

    const dispatch = useDispatch()

    const fetchApi = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}`, getRequestOptions);

            // console.log(response);
            const data = response.data;
            dispatch(setVideos(data.results));

        } catch (err) {
            console.log("Error occurred while fetching API_PLAYINg_NOW", err);
        }
    }

    useEffect(() => {
        fetchApi()

        return () => {
            dispatch(setVideos([]))
        }
    }, [])

}
