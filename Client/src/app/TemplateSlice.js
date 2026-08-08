import { createSlice } from "@reduxjs/toolkit";
import templatesCategory from "../utils/templatesCategoryList.js";

const initialState = {
templatesCategoryList : templatesCategory,
};

export const TemplateSlice = createSlice({
    name : "template",
    initialState,
    reducers : {
        updateTemplateCategoryList : (state , action) => {
            // payloadStructure ---> [{}]
            const updatedList = action.payload;
            state.templatesCategoryList = updatedList;
        },
    }
});

export const { updateTemplateCategoryList } = TemplateSlice.actions;
export default TemplateSlice.reducer;