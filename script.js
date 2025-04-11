const button = document.getElementById('location-button');
const locationInput = document.getElementById('location');

button.addEventListener('click', () => {
    const locationValue = locationInput.value
    getWeather(locationValue);
})

async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=JG55RBPYTP3JZSR3KGZHMBUFR`)
    const data = await response.json();
    console.log(data);
}