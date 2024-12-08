import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../redux/features/favorites/favoriteSlice";
import {
  addProductToLocalStorage,
  getFavoritesFromLocalStorage,
  removeProductFromLocalStorage,
} from "../../Utils/localStorage";
import { useEffect } from "react";
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((fav) => fav._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeProductFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addProductToLocalStorage(product);
    }
  };
  return <div onClick={toggleFavorite} className="absolute top-2 right-5 cursor-pointer">
    {isFavorite ? (
      <FaHeart className="text-pink-500" />
    ) : (
        <FaRegHeart className="text-white" />
    )}
  </div>;
};

export default HeartIcon;
