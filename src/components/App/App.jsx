import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import DeleteConfirmationModal from "../DeleteConfimationModal/DeleteConfirmationModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  locationData,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import { validateToken, signup, signin } from "../../utils/auth.js";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";

import * as api from "../../utils/api.js";

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

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignInClick = () => {
    setActiveModal("signin");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("signup");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("signin");
  };

  const handleAddGarment = ({ name, imageUrl, weather }) => {
    const newItem = {
      name,
      weather,
      imageUrl,
    };

    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
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
    const token = localStorage.getItem("jwt");

    if (selectedCard._id) {
      deleteItem(selectedCard._id, token)
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

  const handleRegistration = async (data) => {
    try {
      const result = await signup(
        data.name,
        data.avatarUrl,
        data.email,
        data.password
      );

      localStorage.setItem("jwt", result.token);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
      handleCloseModal();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleSignIn = async (data) => {
    try {
      const result = await signin(data.email, data.password);

      localStorage.setItem("jwt", result.token);

      const userData = await validateToken(result.token);

      setCurrentUser(userData);
      setIsLoggedIn(true);
      handleCloseModal();
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleUpdateUser = (updatedUserData) => {
    console.log("Updating user with:", updatedUserData);
    setCurrentUser(updatedUserData);
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      validateToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignInClick={handleSignInClick}
              handleSignUpClick={handleSignUpClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onDeleteClick={handleOpenDeleteModal}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      activeModal={activeModal}
                      clothingItems={clothingItems}
                      onAddItem={handleAddClick}
                      onCardClick={handleCardClick}
                      onDeleteClick={handleOpenDeleteModal}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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
            isLoggedIn={isLoggedIn}
          />
          <DeleteConfirmationModal
            activeModal={isDeleteModalOpen}
            handleModalClose={handleCloseModal}
            onConfirm={handleDeleteConfirm}
            item={selectedCard}
          />
          <RegisterModal
            activeModal={activeModal}
            handleModalClose={handleCloseModal}
            onSubmit={handleRegistration}
            onSwitchToLogin={handleSwitchToLogin}
          />
          <LoginModal
            activeModal={activeModal}
            handleModalClose={handleCloseModal}
            onSubmit={handleSignIn}
            onSwitchToRegister={handleSwitchToRegister}
          />
          <EditProfileModal
            activeModal={activeModal}
            handleModalClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
