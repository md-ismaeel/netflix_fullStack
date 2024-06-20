
// APi Endpoint of backend
export const API_END_POINT = 'https://netflix-fullstack.onrender.com/api/v1/user';

// API Endpoints TMDB
export const API_PLAYING_NOW = 'https://api.themoviedb.org/3/movie/now_playing';
export const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular';
export const API_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated'
export const API_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming'
export const API_TRENDING = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
export const API_GENRES = 'https://api.themoviedb.org/3/genre/movie/list'
export const API_TMDB_URL = 'https://image.tmdb.org/t/p/original'


// API request options
export const getRequestOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
    },
};
