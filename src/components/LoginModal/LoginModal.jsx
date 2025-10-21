import "LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

export default function LoginModal({
  activeModal,
  handleModalClose,
  onSubmit,
  onSwitchToRegister,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
  }, [activeModal]);

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={activeModal === "signin"}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      onSwitch={onSwitchToRegister}
      switchText="or Sign Up"
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email"
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
          id="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}
