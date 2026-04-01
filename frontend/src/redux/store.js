import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authReducer from "./authslice";
import jobReducer from "./jobslice";
import {persistReducer,persistStore} from "redux-persist";

const rootReducer = combineReducers({
    auth:authReducer,
    job:jobReducer,
});

const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key:'root',
    storage:storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export default store;