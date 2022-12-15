import { configureStore } from "@reduxjs/toolkit";
import  reusReducer  from "../features/reus/reusSlice"


export const store = configureStore({
    reducer: {
        reusdereus: reusReducer,
    }
})