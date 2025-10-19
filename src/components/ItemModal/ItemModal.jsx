import "./ItemModal.css";

export default function ItemModal({
  activeModal,
  card,
  handleModalClose,
  onDeleteClick,
  isLoggedIn,
}) {
  return (
    <div
      className={`item-modal ${
        activeModal === "preview" ? "item-modal_opened" : ""
      }`}
    >
      <div className="item-modal__content item-modal__content_type_image">
        <button
          onClick={handleModalClose}
          type="button"
          className="item-modal__exit-btn"
        />
        <div className="item-modal__image-container">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="item-modal__image"
          />
          <h2 className="item-modal__caption">{card.name}</h2>
        </div>
        <div className="item-modal__footer">
          <p className="item-modal__weather">Weather: {card.weather}</p>
          {isLoggedIn && (
            <button
              className="item-modal__delete-btn"
              type="button"
              onClick={() => {
                onDeleteClick(card);
              }}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
