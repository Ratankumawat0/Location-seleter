import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states based on selected country
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (country) {
      axios
        .get(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  };

  // Fetch cities based on selected state
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    if (state) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        )
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  };

  // Update selected city
  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>Location Selector</h1>

      {/* Country Dropdown */}
      <div>
        <select onChange={(e) => handleCountryChange(e.target.value)} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div>
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

      {/* City Dropdown */}
      <div>
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

      {/* Display Selected Location */}
      <div>
        {selectedCity && selectedState && selectedCountry ? (
          <p>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        ) : (
          <p>Please complete your selection.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
