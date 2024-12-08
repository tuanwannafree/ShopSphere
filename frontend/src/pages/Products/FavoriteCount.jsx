import { useSelector } from "react-redux";
const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  return (
    <div className="absolute left-3 top-9">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm bg-pink-500 text-white rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoriteCount;
