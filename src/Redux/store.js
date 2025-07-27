import { configureStore } from "@reduxjs/toolkit";
import transcribeReducer from "./store/Transcribe"


const store=configureStore({
    reducer:{
        transcribe:transcribeReducer
    }
})

export default store