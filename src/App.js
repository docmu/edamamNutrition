import React, { useEffect, useState } from "react";
import "./App.css";
import Nutrition from "./Nutrition/Nutrition";

const App = () => {
  const APP_ID = "d1ee3d45";
  const APP_KEY = "3c58b7f3ce63c623ef6fc3fa6ac534fa";

  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    getNutrition();
  }, []);

  const getNutrition = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=1%20large%20apple`
    );
    const data = await response.json();
    setNutrition(data);
    console.log(data);
  };

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <Nutrition
        calories={nutrition.calories}
        carbs={
          Math.round(
            10 *
              (((nutrition || {}).totalNutrients || {}).CHOCDF || {}).quantity
          ) / 10
        }
        proteins={
          Math.round(
            10 *
              (((nutrition || {}).totalNutrients || {}).PROCNT || {}).quantity
          ) / 10
        }
        fats={
          Math.round(
            10 * (((nutrition || {}).totalNutrients || {}).FAT || {}).quantity
          ) / 10
        }
      />
    </div>
  );
};

export default App;
