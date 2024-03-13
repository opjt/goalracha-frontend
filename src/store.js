import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/loginSlice'
import searchSlice from './slices/searchSlice'
export default configureStore({
    reducer: {
        "loginSlice": loginSlice,
        "searchSlice": searchSlice
        
    }
})
