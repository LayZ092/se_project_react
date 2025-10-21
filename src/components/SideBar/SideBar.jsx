import "./SideBar.css";
import userAvatar from "../../assets/Avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useContext } from "react";

export default function SideBar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile-header">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Default avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__btn-group">
        <button
          className="sidebar__edit-profile_btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
}
