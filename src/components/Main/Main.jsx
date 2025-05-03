import "./Main.css";
import "../WeatherCard/WeatherCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function Main({ weatherData, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard />
      <section>
        <p className="weather-card__info">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            //   return item.weather === weatherData.type;
            // })
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item.name}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
