import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch all countries on component mount
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    // Fetch states for the selected country
    axios
      .get(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    // Fetch cities for the selected state
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      )
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        {/* Country Dropdown */}
        <select onChange={(e) => handleCountryChange(e.target.value)} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* State Dropdown */}
        <select
          onChange={(e) => handleStateChange(e.target.value)}
          value={selectedState}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* City Dropdown */}
        <select
          onChange={(e) => handleCityChange(e.target.value)}
          value={selectedCity}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* Display Selected Location */}
        {selectedCity && selectedState && selectedCountry && (
          <p>
            You Selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
