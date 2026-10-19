// import { createSlice } from "@reduxjs/toolkit";
// import TemplatesCategoryList from "../utils/TemplatesCategoryList.js";
// import { act } from "react";

// const initialState = {
// templatesCategoryList : TemplatesCategoryList,
// templatePreviewData : [],
// };

// export const TemplateSlice = createSlice({
//     name : "template",
//     initialState,
//     reducers : {
//         addFilterTemplateCategoryList : (state , action) => {
//             // payloadStructure ---> [{}]
//             const updatedList = action.payload;
//             state.templatesCategoryList = updatedList;
//         },
//         removeFilterTemplateCategoryList : (state , action) => {
//             // return the initail list
//             const currentTemplateCategoryList = state.templatesCategoryList;
//             const isListAlreadyUpdated = currentTemplateCategoryList.length === TemplatesCategoryList.length;
//             console.log(isListAlreadyUpdated , "store");
//             if(isListAlreadyUpdated) return;
//             else {
//             state.templatesCategoryList = TemplatesCategoryList;
//             }
//         },
//         addTemplatePreviewData : (state , action) => {
//             // payload ---> {id , data}
//             const previewData = action.payload;
//             state.templatePreviewData.push(previewData);
//         },
//          getTemplatePreviewData : (state , action) => {
//           return state.templatePreviewData;
//         } 
//     }
// });

// export const { addFilterTemplateCategoryList , removeFilterTemplateCategoryList } = TemplateSlice.actions;
// export default TemplateSlice.reducer;

import { createSlice, createSelector, nanoid } from "@reduxjs/toolkit";
import TemplatesCategoryList from "../utils/TemplatesCategoryList.js";



/* ------------------------------------------------------------------ */
/*  Tweakable constants + shape helpers                                */
/*  (preview data differs per template, so nothing below assumes a     */
/*  fixed shape: "sections" = arrays of objects, "fields" = strings)   */
/* ------------------------------------------------------------------ */

// Keys that identify an element or drive how it renders -> never shown in the config panel
export const HIDDEN_KEYS = ["_key", "enabled", "id", "name", "platform", "type", "icon", "color", "selectedOption"];

// Top-level string values that are NOT listed / edited as plain text
const NON_EDITABLE_FIELDS = ["id", "launchDate"];

// The first of these found on an item is used as its title in the lists
const TITLE_KEYS = ["name", "platform", "text", "label"];

// Nicer labels for specific keys (everything else is derived from the key name)
const KEY_LABELS = { isRequired: "Required" };

export const formatKey = (key) =>
  KEY_LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

export const getItemTitle = (item) => {
  for (const key of TITLE_KEYS) {
    if (typeof item[key] === "string" && item[key]) return item[key];
  }
  return "Untitled";
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isItemArray = (value) => Array.isArray(value) && value.every(isObject);

// Every section item gets a stable `_key` (never the array index) and an `enabled` flag.
// Both are internal only: buildPayload() strips them again.
const normalize = (data) => {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] = isItemArray(value)
      ? value.map((item) => ({ ...item, _key: nanoid(), enabled: true }))
      : value;
  }
  return out;
};

// Single source of truth for BOTH the live preview and the final request body:
// only enabled items, internal keys removed.
export const buildPayload = (data) => {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] = isItemArray(value)
      ? value.filter((item) => item.enabled).map(({ _key, enabled, ...rest }) => rest)
      : value;
  }
  return out;
};

const findItem = (draft, section, key) => draft?.data?.[section]?.find((item) => item._key === key);
const getIn = (target, path) => path.reduce((node, k) => node?.[k], target);
const setIn = (target, path, value) => {
  const parent = getIn(target, path.slice(0, -1));
  if (parent) parent[path[path.length - 1]] = value;
};

/* ------------------------------------------------------------------ */
/*  Slice                                                              */
/* ------------------------------------------------------------------ */

const initialState = {
templatesCategoryList : TemplatesCategoryList,
templatePreviewData : [],   // cache of pristine fetched data: [{ id, data }]
draft : null,               // editable copy: { id, data }
editing : null,             // { kind: "field", field } | { kind: "item", section, key } | null
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
            const isListAlreadyUpdated = currentTemplateCategoryList.length === TemplatesCategoryList.length;
            console.log(isListAlreadyUpdated , "store");
            if(isListAlreadyUpdated) return;
            else {
            state.templatesCategoryList = TemplatesCategoryList;
            }
        },
        addTemplatePreviewData : (state , action) => {
            // payload ---> {id , data}
            const previewData = action.payload;
            state.templatePreviewData.push(previewData);
        },
         getTemplatePreviewData : (state , action) => {
          return state.templatePreviewData;
        },

        // ---- draft lifecycle ----
        loadDraft : {
            // ids are generated in `prepare` so the reducer itself stays pure
            reducer : (state , action) => {
                state.draft = action.payload;
                state.editing = null;
            },
            prepare : (id , data) => ({ payload : { id , data : normalize(data) } }),
        },
        clearDraft : (state) => {
            state.draft = null;
            state.editing = null;
        },

        // ---- which element the right panel is showing ----
        setEditing : (state , action) => {
            state.editing = action.payload;
        },

        // ---- select / unselect (include / exclude) ----
        toggleItem : (state , action) => {
            const { section , key } = action.payload;
            const item = findItem(state.draft , section , key);
            if(!item) return;
            item.enabled = !item.enabled;
            // don't leave the right panel open on an element that just left the form
            if(!item.enabled && state.editing?.kind === "item" && state.editing.key === key) {
                state.editing = null;
            }
        },

        // ---- edits ----
        updateField : (state , action) => {
            const { field , value } = action.payload;
            if(state.draft?.data) state.draft.data[field] = value;
        },
        updateItemValue : (state , action) => {
            // payload ---> { section , key , path , value }   path e.g. ["placeholder" , "01"] or ["optionList" , 2]
            const { section , key , path , value } = action.payload;
            const item = findItem(state.draft , section , key);
            if(item) setIn(item , path , value);
        },
        addListEntry : (state , action) => {
            const { section , key , path } = action.payload;
            const list = getIn(findItem(state.draft , section , key) , path);
            if(Array.isArray(list)) list.push("");
        },
        removeListEntry : (state , action) => {
            const { section , key , path , index } = action.payload;
            const list = getIn(findItem(state.draft , section , key) , path);
            if(Array.isArray(list)) list.splice(index , 1);
        },
    }
});

/* ------------------------------------------------------------------ */
/*  Selectors                                                          */
/* ------------------------------------------------------------------ */

// change `state.template` if your store registers this slice under another key
const selectTemplateState = (state) => state.template;
const selectData = (state) => selectTemplateState(state).draft?.data;
const EMPTY = [];

export const selectCachedPreviewData = (state , id) =>
    selectTemplateState(state).templatePreviewData.find((entry) => entry.id === id)?.data;

export const selectEditing = (state) => selectTemplateState(state).editing;

// arrays of strings -> use with shallowEqual so consumers only re-render when the structure changes
export const selectFieldNames = (state) => {
    const data = selectData(state);
    if(!data) return EMPTY;
    return Object.keys(data).filter((k) => typeof data[k] === "string" && !NON_EDITABLE_FIELDS.includes(k));
};
export const selectSectionNames = (state) => {
    const data = selectData(state);
    if(!data) return EMPTY;
    return Object.keys(data).filter((k) => isItemArray(data[k]));
};
export const selectItemKeys = (state , section) =>
    selectData(state)?.[section]?.map((item) => item._key) ?? EMPTY;

// these keep the same reference until that specific value is edited (Immer structural sharing)
export const selectItem = (state , section , key) =>
    selectData(state)?.[section]?.find((item) => item._key === key);
export const selectField = (state , field) => selectData(state)?.[field];

// memoized: recomputed only when the draft data changes
export const selectPreviewData = createSelector([selectData] , (data) => (data ? buildPayload(data) : null));

export const {
    addFilterTemplateCategoryList ,
    removeFilterTemplateCategoryList ,
    addTemplatePreviewData ,
    loadDraft ,
    clearDraft ,
    setEditing ,
    toggleItem ,
    updateField ,
    updateItemValue ,
    addListEntry ,
    removeListEntry ,
} = TemplateSlice.actions;
export default TemplateSlice.reducer;