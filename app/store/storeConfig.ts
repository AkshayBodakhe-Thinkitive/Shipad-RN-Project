import { configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { persistedReducer } from "./persistConfig"
import { persistStore } from 'redux-persist'


export const createStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false, immutableCheck : false})
    })
    return store;
}

const store = createStore();

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, any>

export {store, persistor}