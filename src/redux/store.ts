import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import {getFavoritesFromLocalStorage} from "../utils/localStorage.ts";
import {apiSlice} from "./api/apiSlice.ts";
import favoriteReducer from "@/redux/features/favoriteSlice.ts";
import authReducer from "@/redux/features/authSlice.ts";
import cartSliceReducer from "@/redux/features/cartSlice.ts";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartSliceReducer,
    },

    preloadedState: {
        favorites: initialFavorites,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// If you use `useDispatch`, you may also want to export this type
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
