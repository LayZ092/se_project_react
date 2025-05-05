export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/thunderstorm.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/thunderstorm.svg", import.meta.url).href,
  },
];

export const weatherConditionMapping = {
  clear: "clear", // Maps to "clear sky"
  clouds: "cloudy", // Maps to "few clouds", "scattered clouds", "broken clouds"
  "few clouds": "cloudy", // Explicit mapping for "few clouds"
  "scattered clouds": "cloudy", // Explicit mapping for "scattered clouds"
  "broken clouds": "cloudy", // Explicit mapping for "broken clouds"
  mist: "fog", // Maps to "mist"
  haze: "fog",
  fog: "fog",
  rain: "rain", // Maps to "rain"
  "shower rain": "rain", // Explicit mapping for "shower rain"
  drizzle: "rain",
  snow: "snow", // Maps to "snow"
  thunderstorm: "thunderstorm", // Maps to "thunderstorm"
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://i.pinimg.com/736x/86/90/7b/86907b01d8cae9f394cb99eaf540945b.jpg",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://i.pinimg.com/736x/a7/be/0f/a7be0f476324bbbd68b96ffc85539bdf.jpg",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://i.pinimg.com/736x/b7/68/2a/b7682a159f083ed27b7e020097ff815d.jpg",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://i.pinimg.com/736x/18/9f/6d/189f6df514f5e1b172f69d154cf5da2d.jpg",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://i.pinimg.com/736x/43/44/5a/43445a3dc49f6c9cf78d8de2e5419d6e.jpg",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://i.pinimg.com/736x/d2/61/36/d26136fcd3240e8e0b40e03b6d525c36.jpg",
  },
];

export const locationData = {
  latitude: 29.7499,
  longitude: -95.3584,
};

export const APIkey = "d22a0a1f18e45cc2b3f69f90e9685df9";
