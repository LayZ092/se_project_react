import "./Main.css";
import "../WeatherCard/WeatherCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";

export default function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="weather-card__info">
          Today is 75 &deg; F / You may want to wear:
        </p>
      </section>
    </main>
  );
}
