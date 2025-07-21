// API URL template
// Example: https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=chennai&aqi=no

// DOM Elements
const temperatureField = document.querySelector(".temp p");             // Temperature value
const locationField = document.querySelector(".location_time p");       // Location name
const dateandTimeField = document.querySelector(".location_time span"); // Date and time
const conditionField = document.querySelector(".condition p:last-child"); // Weather condition
const searchField = document.querySelector(".search_area");             // Input box
const form = document.querySelector("form");                            // Search form

// Event Listener for form submit
form.addEventListener('submit', searchForLocation);

// Default location
let target = "chennai";

// Fetch weather data from API
const fetchResult = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=68a829a19c2442b98fe63656252107&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data); // For debugging

    // Extract necessary data
    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    // Update UI
    updateDetails(temp, locationName, time, condition);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// Update UI with weather details
function updateDetails(temp, locationName, time, condition) {
  const splitDate = time.split(" ")[0];
  const splitTime = time.split(" ")[1];
  const currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitTime} - ${currentDay} ${splitDate}`;
  conditionField.innerText = condition;
}

// Search handler
function searchForLocation(e) {
  e.preventDefault(); // Prevent form reload
  target = searchField.value.trim(); // Get input value
  if (target) fetchResult(target);
}

// Helper function to convert day number to day name
function getDayName(number) {
  switch (number) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
  }
}

// Initial fetch on page load
fetchResult(target);
