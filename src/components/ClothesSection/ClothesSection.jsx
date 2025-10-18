import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";

import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  onAddItem,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__controls">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="header__add-btn clothes-section__add-btn"
          onClick={onAddItem}
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list clothes-section__cards-list">
        {userItems.map((item) => {
          return (
            <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
