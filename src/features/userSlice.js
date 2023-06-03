import { createSlice } from '@reduxjs/toolkit'

const initialState = {value: {}}
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getUserDetails: (state, actions)=>{
            state.value = actions.payload
        }
    },
})
export const { getUserDetails } = userSlice.actions

export default userSlice.reducer