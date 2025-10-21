import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartIcon from "../../assets/heart.svg";
import heartLiked from "../../assets/heart-liked.png";

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
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {currentUser && isLoggedIn && (
          <button
            className={`card__like-btn ${
              isLiked ? "card__like-btn-isliked" : ""
            }`}
            onClick={handleLike}
            type="button"
          >
            <img src={isLiked ? heartLiked : heartIcon} alt="heart" />
          </button>
        )}
      </div>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        src={item.imageUrl}
        alt={item.name}
        className="cards__image"
      />
    </li>
  );
}
