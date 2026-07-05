import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import jobReducer from "./jobSlice";
import recruiterJobReducer from "./recruiterJobSlice";
import companyReducer from "./companySlice";

import { persistReducer, persistStore } from "redux-persist";

// custom localStorage 
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};


const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  recruiterJobs: recruiterJobReducer, // recruiter
  company: companyReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

//  single store only
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//  export persistor
export const persistor = persistStore(store);