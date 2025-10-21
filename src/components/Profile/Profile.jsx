import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

export default function Profile({
  onCardClick,
  clothingItems,
  onAddItem,
  handleEditProfileClick,
  activeModal,
  handleModalClose,
  onCardLike,
  isLoggedIn,
  handleSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
        <EditProfileModal
          activeModal={activeModal}
          handleModalClose={handleModalClose}
        />
      </section>
    </div>
  );
}
