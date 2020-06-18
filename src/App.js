import React, { useEffect, useState } from "react";
import "./App.css";
import Nutrition from "./Nutrition/Nutrition";

const App = () => {
  const APP_ID = "d1ee3d45";
  const APP_KEY = "3c58b7f3ce63c623ef6fc3fa6ac534fa";

  const [nutrition, setNutrition] = useState([]); //fetched nutrition information
  // const [search, setSearch] = useState(""); //search bar
  const [query, setQuery] = useState("");
  // const [query2, setQuery2] = useState("");

  const [search, setSearch] = useState({
    food: "",
    quantity: 1,
    unit: "g",
  });
  // const [query, setQuery] = useState({
  //   food: "",
  //   quantity: 1,
  //   unit: "g",
  // });

  //this code runs only when submit button is clicked
  useEffect(() => {
    getNutrition();
  }, [query]);

  //fetch nutrition info
  const getNutrition = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=1%20large%20${query}`
    );
    const data = await response.json();
    setNutrition(data);
    console.log(data);
    // console.log("query.food in getNutrition: " + query.food);
  };

  // //allows user input into search bar
  // const updateSearch = (event) => {
  //   setSearch(event.target.value);
  // };
  // //get searched user input
  // const getSearch = (event) => {
  //   event.preventDefault(); //prevent page refresh
  //   setQuery(search);
  //   setSearch("");
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //prevent page refresh
    setQuery(search.food);
    setSearch("");
  };
  // //this works!
  const onChangeHandler = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
    console.log(search);
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={onSubmitHandler}>
        <input
          name="food"
          className="search-bar"
          type="text"
          value={search.food}
          onChange={onChangeHandler}
        />
        <p>search.food {search.food}</p>
        <input
          name="quantity"
          className="search-bar"
          type="number"
          value={search.quantity}
          onChange={onChangeHandler}
        />
        <p>search.quantity {search.quantity}</p>
        <select
          name="unit"
          className="dropdown-menu"
          onChange={onChangeHandler}
        >
          <option value="grams">g</option>
          <option value="ounces">oz</option>
          <option value="mililiter">ml</option>
          <option value="tablespoon">tbsp</option>
          <option value="teaspoon">tsp</option>
        </select>
        <p>search.unit {search.unit}</p>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <Nutrition title={query} nutrition={nutrition} />
    </div>
  );
};

export default App;
