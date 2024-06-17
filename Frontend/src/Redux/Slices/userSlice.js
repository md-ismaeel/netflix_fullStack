import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    loading: false
}

const UserSlice = createSlice({
    name: "netflixUsers",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading, setUser } = UserSlice.actions;
export const { userSlice } = UserSlice.reducer;