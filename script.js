const button = document.getElementById("searchBtn");
const search = document.querySelector(`input[type="text"]`);
const apiKey = "1865d834461eb9a6389fa09bc1ef2a25";
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temperature");
const desc = document.getElementById("condition");
async function getWeather(city) {
  if (!city) return;
  const cleanCity = city.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    cityName.textContent = `${data.name},${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    desc.textContent = data.weather[0].description;
  } catch (error) {
    cityName.textContent = error.message;
    temp.textContent = "";
    desc.textContent = "";
  }
}
button.addEventListener("click", () => {
  getWeather(search.value);
});
search.addEventListener("keypress", (e) => {
  if (e.value === "Enter") {
    getWeather(search.value);
  }
});
