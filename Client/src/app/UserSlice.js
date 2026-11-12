import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loggedInUser : null
}

export const UserSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setLoggedInUser : (state , action) => {
            // payload ---> {username , email , profileImage}
            const user = action.payload;
            state.loggedInUser = user;
        
        },
        removeLoggedInUser : (state , action) => {
        const user = null;
        state.loggedInUser = user;
        }
    }
})


export const { setLoggedInUser , removeLoggedInUser } = UserSlice.actions;
export default UserSlice.reducer;
