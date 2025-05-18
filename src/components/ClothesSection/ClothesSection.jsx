import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__controls">
        <p className="clothes-section__title">Your items</p>
        <button type="button" className="header__add-btn">
          + Add new
        </button>
      </div>
      <ul className="cards__list clothes-section__cards-list">
        {defaultClothingItems.map((item) => {
          return <ItemCard item={item} key={item.name} />;
        })}
      </ul>
    </div>
  );
}
