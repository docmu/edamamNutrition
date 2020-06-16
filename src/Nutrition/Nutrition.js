import React from "react";

const Nutrition = ({ calories, carbs, proteins, fats }) => {
  return (
    <div>
      <h1>Title</h1>
      <p>Calories: {calories} g</p>
      <p>Carbs: {carbs} g</p>
      <p>Protiens: {proteins} g</p>
      <p>Fats: {fats} g</p>
    </div>
  );
};

export default Nutrition;
