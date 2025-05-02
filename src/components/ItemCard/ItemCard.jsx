import "./ItemCard.css";

export default function ItemCard({ item }) {
  return (
    <div className="cards">
      <h2 className="cards__title">{item.name}</h2>
      <img src={item.link} alt={item.name} className="cards__image" />
    </div>
  );
}
