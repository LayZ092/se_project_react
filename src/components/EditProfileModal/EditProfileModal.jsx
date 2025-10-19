import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import { useContext } from "react";
import { updateUser } from "../../utils/auth.js";

export default function EditProfileModal({
  activeModal,
  handleModalClose,
  onUpdateUser,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatarUrl: "",
  });

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = async (userData) => {
    try {
      const updatedUser = await updateUser(userData.name, userData.avatarUrl);
      onUpdateUser(updatedUser);
      handleModalClose();
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatarUrl: currentUser.avatarUrl || "",
      });
    }
  }, [activeModal, currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Change profile data"
      isOpen={activeModal === "edit-profile"}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="signup name"
          placeholder="edit name"
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          name="avatarUrl"
          id="avatarUrl"
          placeholder="edit avatar"
          required
          onChange={handleChange}
          value={values.avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}
