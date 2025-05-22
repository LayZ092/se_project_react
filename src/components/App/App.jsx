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
    console.log("Form Data:", { name, imageUrl, weather });

    const newItem = {
      name,
      weather,
      imageUrl,
    };

    console.log("Making API call with:", newItem);

    addItem(newItem)
      .then((addedItem) => {
        console.log("Response from API:", addedItem);
        setClothingItems([addedItem, ...clothingItems]);
        console.log("Updated clothing items:", clothingItems);
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
    console.log("Delete confirmation triggered");
    console.log("Selected card:", selectedCard); // Check if we have the correct card

    if (selectedCard._id) {
      console.log("Attempting to delete item with ID:", selectedCard._id);

      deleteItem(selectedCard._id)
        .then(() => {
          console.log("Delete API call successful");
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          setIsDeleteModalOpen(false);
          setSelectedCard({});
          setActiveModal("");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          console.error("Full error object:", JSON.stringify(error, null, 2));
        });
    } else {
      console.log("No _id found in selectedCard");
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
          handleModalClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          item={selectedCard}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
