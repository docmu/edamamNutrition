import React, { useEffect, useState } from "react";
import "./App.css";
import Nutrition from "./Nutrition/Nutrition";

const App = () => {
  const APP_ID = "d1ee3d45";
  const APP_KEY = "3c58b7f3ce63c623ef6fc3fa6ac534fa";

  const [nutrition, setNutrition] = useState([]); //fetched nutrition information
  const [search, setSearch] = useState(""); //search bar
  // const [query, setQuery] = useState({
  //   food: "",
  //   quantity: 0,
  //   unit: "-",
  // });
  const [query, setQuery] = useState("");

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
  };

  //allows user input into search bar
  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault(); //prevent page refresh
    setQuery(search);
    setSearch("");
  };
  //get search query
  // const getSearch = (propertyName) => (event) => {
  //   event.preventDefault(); //prevent page refresh
  //   const newQuery = {
  //     ...query,
  //     [propertyName]: event.target.value,
  //   };
  //   setQuery({ query: newQuery });
  //   console.log(newQuery);
  //   setSearch("");
  // };

  const onChangeHandler = (event) => {
    setSearch({ [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        {/* <input
          className="search-bar"
          type="number"
          value={search}
          onChange={onChangeHandler}
        /> */}
        {/* <select className="dropdown-menu">
          <option value="grams">g</option>
          <option value="ounces">oz</option>
          <option value="mililiter">ml</option>
          <option value="tablespoon">tbsp</option>
          <option value="teaspoon">tsp</option>
        </select> */}
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <Nutrition title={query} nutrition={nutrition} />
    </div>
  );
};

export default App;
