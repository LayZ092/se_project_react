import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  locationData,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddGarment = (values) => {
    setClothingItems([...clothingItems, values]);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(locationData, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleModalClose={handleCloseModal}
        onSubmit={handleAddGarment}
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
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleModalClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
}

export default App;
