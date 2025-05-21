import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddItemModal({
  activeModal,
  handleModalClose,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, imageURL, weather });
    setName("");
    setImageURL("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="name"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          name="link"
          id="link"
          placeholder="Image URL"
          required
          onChange={handleImageURLChange}
          value={imageURL}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            name="weather"
            onChange={handWeatherChange}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            name="weather"
            onChange={handWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-label">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            value="cold"
            name="weather"
            onChange={handWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
