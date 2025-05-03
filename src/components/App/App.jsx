import { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
  });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm title="New garment" buttonText="Add garment">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="image" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            name="image"
            id="image"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <Footer />
    </div>
  );
}

export default App;
