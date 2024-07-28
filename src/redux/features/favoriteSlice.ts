import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Product {
    _id: string;
}

interface RootState {
    favorites: Product[];
}

// Load favorites from localStorage
const loadFavoritesFromStorage = (): Product[] => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: loadFavoritesFromStorage(),
    reducers: {
        addToFavorites: (state, action: PayloadAction<Product>) => {
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state));
            }
        },
        removeFromFavorites: (state, action: PayloadAction<Product>) => {
            const newState = state.filter((product) => product._id !== action.payload._id);
            localStorage.setItem("favorites", JSON.stringify(newState));
            return newState;
        },
        setFavorites: (_state, action: PayloadAction<Product[]>) => {
            localStorage.setItem("favorites", JSON.stringify(action.payload));
            return action.payload;
        },
    },
});

export const {addToFavorites, removeFromFavorites, setFavorites} = favoriteSlice.actions;

export const selectFavoriteProduct = (state: RootState) => state.favorites;

export default favoriteSlice.reducer;
