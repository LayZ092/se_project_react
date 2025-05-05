import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

export default function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.condition === weatherData.condition &&
      option.day === weatherData.isDay
    );
  });

  console.log("Weather Data:", weatherData);
  console.log("Filtered Options:", filteredOptions);

  const weatherOptionUrl = filteredOptions[0]?.url || weatherOptions[0].url;
  const weatherOptionCondition =
    filteredOptions[0]?.condition || weatherOptions[0].condition;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}
