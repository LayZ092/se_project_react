import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import headerLogo from "../../assets/Logo.svg";
import userAvatar from "../../assets/Avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({
  handleAddClick,
  weatherData,
  handleSignInClick,
  handleSignUpClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__toggle-switch">
        <ToggleSwitch />
      </div>
      {isLoggedIn ? (
        // Logged in user sees this
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-btn"
          >
            + Add clothes
          </button>
          <Link to={"/profile"} className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar || userAvatar}
                alt={currentUser.name}
                className="header__user-avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        // Non-logged in user sees this
        <div className="header__auth-buttons">
          <button onClick={handleSignUpClick} className="header__signup-btn">
            Signup
          </button>
          <button onClick={handleSignInClick} className="header__signin-btn">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
