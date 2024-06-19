import { useEffect } from 'react'
import { API_GENRES, getRequestOptions } from '../utils/endPoints';
import axios from 'axios';
import { setGenres } from '../Redux/Slices/movieSlice';
import { useDispatch } from 'react-redux';

export const useGenres = () => {

  const dispatch = useDispatch()

  const fetchApi = async () => {
    try {
      const response = await axios.get(API_GENRES, getRequestOptions);

      // console.log(response);
      const data = response.data;
      const filteredData = data.genres.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      dispatch(setGenres(filteredData));

    } catch (err) {
      console.log("Error occurred while fetching API_PLAYINg_NOW", err);
    }
  }

  useEffect(() => {
    fetchApi()

    return () => {
      dispatch(setGenres([]))
    }
  }, [])
}
