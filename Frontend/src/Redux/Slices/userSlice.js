import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isLoading: false,
    myList: ['hello']
}

const userSlice = createSlice({
    name: "netflixUsers",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setMyList: (state, actions) => {
            state.myList = actions.payload;
        }
    }
})

export const { setIsLoading, setUser, setMyList } = userSlice.actions;
export default userSlice.reducer;