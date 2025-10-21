import "RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

export default function RegisterModal({
  activeModal,
  handleModalClose,
  onSubmit,
  onSwitchToLogin,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatarUrl: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    setValues({
      name: "",
      avatarUrl: "",
      email: "",
      password: "",
    });
  }, [activeModal]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={activeModal === "signup"}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      onSwitch={onSwitchToLogin}
      switchText="or Log In"
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="signup name"
          placeholder="Name"
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
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatarUrl}
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          id="signup email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          id="signup password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}
