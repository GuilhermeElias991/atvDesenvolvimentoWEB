// Selecionando elementos do DOM
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search");
const weatherData = document.getElementById("weather-data");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

// Elementos de saída
const cityName = document.getElementById("city");
const countryFlag = document.getElementById("country");
const temperature = document.getElementById("temperature").querySelector("span");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const umidity = document.getElementById("umidity").querySelector("span");
const windSpeed = document.getElementById("wind").querySelector("span");

// API Key e URL base da OpenWeatherMap
const API_KEY = "91145a3a7dabe68ba0006a7cf976b908"; // Substitua pela sua chave de API
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Função para buscar os dados climáticos
async function fetchWeather(city) {
  try {
    // Mostrando o loader
    loader.classList.remove("hide");
    errorMessage.classList.add("hide");
    weatherData.classList.add("hide");

    // Fazendo a requisição
    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${API_KEY}&lang=pt`
    );

    if (!response.ok) {
      throw new Error("Cidade não encontrada!");
    }

    const data = await response.json();

    // Atualizando os dados no DOM
    updateWeatherData(data);
  } catch (error) {
    showError(error.message);
  } finally {
    // Ocultando o loader
    loader.classList.add("hide");
  }
}

// Função para atualizar os dados climáticos no DOM
function updateWeatherData(data) {
  const { name, sys, main, weather, wind } = data;

  cityName.textContent = name;
  countryFlag.src = `https://flagsapi.com/${sys.country}/flat/32.png`;
  temperature.textContent = Math.round(main.temp);
  description.textContent = weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  umidity.textContent = `${main.humidity}%`;
  windSpeed.textContent = `${Math.round(wind.speed)} km/h`;

  weatherData.classList.remove("hide");
}

// Função para exibir mensagens de erro
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hide");
}

// Adicionando evento ao botão de busca
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Adicionando evento ao pressionar Enter no campo de texto
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
