import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";

export default function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}
