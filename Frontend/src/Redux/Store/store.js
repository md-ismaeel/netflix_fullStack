import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../Slices/userSlice"
import movieSlice from "../Slices/movieSlice"


const loadState = () => {
    try {
        const savedData = localStorage.getItem('users');
        if (savedData === null) {
            return undefined;
        }
        return JSON.parse(savedData);
    } catch (err) {
        return undefined;
    }
};

// Function to save state to localStorage
const saveState = (state) => {
    try {
        const { user, addToList } = state.userSlice
        const savedData = JSON.stringify({
            userSlice: { user, addToList }, 
        });
        localStorage.setItem('users', savedData);
    } catch (err) {
        console.log(err);
    }
};

// Load any previously persisted state from localStorage
const persistedState = loadState();

const store = configureStore({
    reducer: {
        userSlice,
        movieSlice,
    },
    preloadedState: persistedState, // Initialize with persisted state from localStorage
});

// Subscribe to store state changes to save to localStorage
store.subscribe(() => {
    saveState(store.getState());
});

export default store;