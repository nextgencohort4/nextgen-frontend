interface Product {
    _id: string;
}

// Add a product to a localStorage
export const addFavoriteToLocalStorage = (product: Product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// Remove a product from a localStorage
export const removeFavoriteFromLocalStorage = (productId: string) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId
    );

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

// Retrieve favorites from a localStorage
export const getFavoritesFromLocalStorage = (): Product[] => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};