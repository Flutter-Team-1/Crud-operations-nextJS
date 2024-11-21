import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import UserSlice from "./userSlice";

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};
const persistedReducer = persistReducer(persistConfig, UserSlice);

const store = configureStore({
    reducer: {
        brands: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

const persistor = persistStore(store);

export { store, persistor };