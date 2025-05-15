import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  return (
    <label htmlFor="tempSwitch" className="toggle-switch">
      <input
        type="checkbox"
        id="tempSwitch"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__slider"></span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}
