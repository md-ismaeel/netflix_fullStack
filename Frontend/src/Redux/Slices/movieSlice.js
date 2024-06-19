import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playMovies: [],
    popularMovies: [],
    toRatedMovies: [],
    upcomingMovies: [],
    trendingMovies: [],
    genres: [],
    movieDetails: {},
    credits: [],
    videos: [],
    similarMovies: [],
    recommendations: [],
    movies: [],
    tvShows: []
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setPlayMovies: (state, actions) => {
            state.playMovies = actions.payload;
        },
        setPopularMovies: (state, actions) => {
            state.popularMovies = actions.payload;
        },
        setTopRatedMovies: (state, actions) => {
            state.toRatedMovies = actions.payload;
        },
        setUpcomingMovies: (state, actions) => {
            state.upcomingMovies = actions.payload;
        },
        setTrendingMovies: (state, actions) => {
            state.trendingMovies = actions.payload;
        },
        setGenres: (state, actions) => {
            state.genres = actions.payload;
        },
        setMovieDetails: (state, actions) => {
            state.movieDetails = actions.payload
        },
        setCredits: (state, actions) => {
            state.credits = actions.payload
        },
        setVideos: (state, actions) => {
            state.videos = actions.payload;
        },
        setSimilarMovies: (state, actions) => {
            state.similarMovies = actions.payload;
        },
        setRecommendations: (state, actions) => {
            state.recommendations = actions.payload;
        },
        setMovies: (state, actions) => {
            state.movies = actions.payload
        },
        setTvShows: (state, actions) => {
            state.tvShows = actions.payload
        }
    },
});

export const {
    setPlayMovies,
    setPopularMovies,
    setTopRatedMovies,
    setUpcomingMovies,
    setTrendingMovies,
    setGenres,
    setMovieDetails,
    setCredits,
    setVideos,
    setRecommendations,
    setSimilarMovies,
    setMovies,
    setTvShows
} = movieSlice.actions;

export default movieSlice.reducer;
