import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    <li className="cards">
      <h2 className="cards__title">{item.name}</h2>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        src={item.link}
        alt={item.name}
        className="cards__image"
      />
    </li>
  );
}
