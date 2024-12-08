// Add a product to localStorage
export const addProductToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    // Add product only if it doesn't already exist
    if (!favorites.some((fav) => fav._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove a product from localStorage
  export const removeProductFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((fav) => fav._id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  // Retrieve all favorites from localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };
  