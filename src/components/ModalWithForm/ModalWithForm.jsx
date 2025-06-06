import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  handleModalClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__exit-btn"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
