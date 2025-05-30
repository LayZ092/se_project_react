import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({ onCardClick, clothingItems, onAddItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
        />
      </section>
    </div>
  );
}
