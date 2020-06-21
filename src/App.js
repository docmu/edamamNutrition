import React, { useEffect, useState } from "react";
import "./App.css";
import Nutrition from "./Nutrition/Nutrition";

const App = () => {
  const APP_ID = "d1ee3d45";
  const APP_KEY = "3c58b7f3ce63c623ef6fc3fa6ac534fa";

  const [nutrition, setNutrition] = useState([]); //fetched nutrition information
  // const [query, setQuery] = useState(""); //use for .food
  const [query, setQuery] = useState([]); //use for .quantity
  const [search, setSearch] = useState({
    food: "",
    quantity: 1,
    unit: "g",
  });
  //Figure out how to do this correctly!!
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
      `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=100%20grams%20${query[0]}`
    );
    const data = await response.json();
    setNutrition(data);
    console.log(data);
    console.log(query[0] + "    query[0]");
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
    setQuery(query.push(search.food));
    setQuery(query.push(search.quantity));
    setQuery(query.push(search.unit));
    console.log(query);
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
          value={search.food || ""}
          onChange={onChangeHandler}
        />
        <p>search.food {search.food}</p>
        <input
          name="quantity"
          className="search-bar"
          type="number"
          value={search.quantity || ""}
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
      <Nutrition title={query[0]} nutrition={nutrition} />
    </div>
  );
};

export default App;
