import { configureStore } from "@reduxjs/toolkit";
import TemplateReducer from "./TemplateSlice.js";
import UserSliceReducer from "./UserSlice.js";

export const store = configureStore({
    reducer : {
        template : TemplateReducer,
        user : UserSliceReducer
    },
});