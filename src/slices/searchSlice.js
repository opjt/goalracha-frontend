import {createSlice } from "@reduxjs/toolkit";



const searchSlice = createSlice({
    name: 'SearchSlice',
    initialState: "",
    reducers: {
   
        update: (state, action) => { 
            const payload = action.payload
            return payload
        }
        
    }
    
    

})
export const { update } = searchSlice.actions
export default searchSlice.reducer