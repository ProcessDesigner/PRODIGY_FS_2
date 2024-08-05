import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authsliice.js'
import empSliceReducer from "./Slices/empSlice.js";
const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        emp:empSliceReducer
    },
    devTools:true
});
export default store