import "./Main.css";
import "../WeatherCard/WeatherCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function Main({ weatherData, handleCardClick, clothingItems }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section>
        <p className="weather-card__info">
          Today is {weatherData.type} {weatherData.temp.F} &deg; F / You may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
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
