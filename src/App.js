import React, { useState, useEffect } from "react";
import "./App.css";

const SearchWidget = () => {
  const [cities, setCities] = useState(["Бишкек"]);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Ошибка при получении городов:", error);
    }
  };

  const handleSearch = () => {
    if (
      !startPoint ||
      !endPoint ||
      !startDate ||
      (startDate && endDate && startDate > endDate)
    ) {
      setError("Пожалуйста, заполните все поля правильно");
      return;
    }

    const searchData = {
      startPoint,
      endPoint,
      startDate,
      endDate,
    };

    const searchEvent = new CustomEvent("search", { detail: searchData });
    document.dispatchEvent(searchEvent);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartPointChange = (event) => {
    setStartPoint(event.target.value);
  };

  const handleEndPointChange = (event) => {
    setEndPoint(event.target.value);
  };

  return (
    <div className="search-widget">
      <label htmlFor="startPoint">Начальная точка:</label>
      <input
        type="text"
        id="startPoint"
        value={startPoint}
        onChange={handleStartPointChange}
        list="cities"
        className="input"
      />
      <datalist id="cities">
        {cities.map((city) => (
          <option value={city.address?.city} key={city.id} />
        ))}
      </datalist>

      <label htmlFor="endPoint">Конечная точка:</label>
      <input
        type="text"
        id="endPoint"
        value={endPoint}
        onChange={handleEndPointChange}
        list="cities"
        className="input"
      />

      <div>
        <label htmlFor="startDate">Начальная дата:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleStartDateChange}
          className="input"
        />

        <label htmlFor="endDate">Конечная дата:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          min={startDate}
          onChange={handleEndDateChange}
          className="input"
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button onClick={handleSearch} className="button">
        Поиск
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SearchWidget />
    </div>
  );
}

export default App;
