const form = document.querySelector("form");
const locationInput = document.getElementById("location");
const content = document.getElementById("content");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationValue = locationInput.value;
  getWeather(locationValue);
  form.reset();
});

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=JG55RBPYTP3JZSR3KGZHMBUFR`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    const processedData = processData(data);
    console.log(processedData);
    displayData(processedData);
  } catch (error) {
    console.error(error);
    content.innerHTML = `<p>Sorry, we couldn't get the weather data. Please try again.</p>`;
  }
}

function processData(data) {
  return {
    address: data.address,
    currentConditions: data.currentConditions,
    description: data.description,
  };
}

function displayData(data) {
  content.innerHTML = `
  <p>${data.address}</p>
  <p>${data.description}</p>
  <p>Conditions: ${data.currentConditions.conditions}</p>
  <p>Temperature: ${Math.round(
    (data.currentConditions.temp - 32) / 1.8
  )}&deg;C</p>
  <p>Humidity: ${data.currentConditions.humidity}%`;
}
