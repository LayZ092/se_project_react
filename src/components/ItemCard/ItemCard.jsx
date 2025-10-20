import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartIcon from "../../assets/heart.svg";

import { useContext } from "react";

export default function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    Array.isArray(item.likes) && currentUser?._id
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        src={item.imageUrl}
        alt={item.name}
        className="cards__image"
      />
      {currentUser && isLoggedIn && (
        <button className="card__like-btn" onClick={handleLike} type="button">
          <img src={heartIcon} alt="heart" />
        </button>
      )}
    </li>
  );
}
