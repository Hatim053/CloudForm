import { configureStore } from "@reduxjs/toolkit";
import TemplateReducer from "./TemplateSlice.js";

export const store = configureStore({
    reducer : {
        template : TemplateReducer,
    },
});