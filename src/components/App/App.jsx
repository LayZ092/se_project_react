import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";
import {
  locationData,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem, deleteItem } from "../../utils/API.js";
import DeleteConfirmationModal from "../DeleteConfimationModal/DeleteConfirmationModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddGarment = ({ name, imageUrl, weather }) => {
    const newItem = {
      name,
      weather,
      imageUrl,
    };

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenDeleteModal = (card) => {
    setSelectedCard(card);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCard._id) {
      deleteItem(selectedCard._id)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          setIsDeleteModalOpen(false);
          setSelectedCard({});
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          console.error("Full error object:", JSON.stringify(error, null, 2));
        });
    } else {
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeather(locationData, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onDeleteClick={handleOpenDeleteModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onDeleteClick={handleOpenDeleteModal}
                  onAddItem={handleAddClick}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          activeModal={activeModal}
          handleModalClose={handleCloseModal}
          onSubmit={handleAddGarment}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleModalClose={handleCloseModal}
          onDeleteClick={handleOpenDeleteModal}
        />
        <DeleteConfirmationModal
          activeModal={isDeleteModalOpen}
          handleModalClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          item={selectedCard}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
