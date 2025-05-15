import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import headerLogo from "../../assets/Logo.svg";
import userAvatar from "../../assets/Avatar.svg";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__toggle-switch">
        <ToggleSwitch />
      </div>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={userAvatar}
          alt="Terrence Tegegne"
          className="header__user-avatar"
        />
      </div>
    </header>
  );
}
