import "./DeleteConfirmationModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function DeleteConfirmationModal({
  activeModal,
  handleModalClose,
  onConfirm,
  item,
}) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button
          type="button"
          className="modal__exit-btn delete-modal__exit-btn"
          onClick={handleModalClose}
        />
        <p className="delete-modal__title">
          Are you sure you want to delete this {item.name}? <br />
          This action cannot be undone.
        </p>
        <div className="delete-modal__controls">
          <button className="delete-modal__confirm-btn" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button
            className="delete-modal__cancel-btn"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
