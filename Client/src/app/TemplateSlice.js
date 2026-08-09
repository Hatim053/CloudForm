import { createSlice } from "@reduxjs/toolkit";
import templatesCategory from "../utils/TemplatesCategoryList.js";

const initialState = {
templatesCategoryList : templatesCategory,
};

export const TemplateSlice = createSlice({
    name : "template",
    initialState,
    reducers : {
        addFilterTemplateCategoryList : (state , action) => {
            // payloadStructure ---> [{}]
            const updatedList = action.payload;
            state.templatesCategoryList = updatedList;
        },
        removeFilterTemplateCategoryList : (state , action) => {
            // return the initail list
            const currentTemplateCategoryList = state.templatesCategoryList;
            const isListAlreadyUpdated = currentTemplateCategoryList.length === templatesCategory.length;
            console.log(isListAlreadyUpdated , "store");
            if(isListAlreadyUpdated) return;
            else {
            state.templatesCategoryList = templatesCategory;
            }
        }   
    }
});

export const { addFilterTemplateCategoryList , removeFilterTemplateCategoryList } = TemplateSlice.actions;
export default TemplateSlice.reducer;