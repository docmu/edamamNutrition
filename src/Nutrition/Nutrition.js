import React from "react";

const Nutrition = ({ title, nutrition }) => {
  //Technique to deal with nested object access
  const carbs =
    Math.round(
      10 * (((nutrition || {}).totalNutrients || {}).CHOCDF || {}).quantity
    ) / 10;
  const proteins =
    Math.round(
      10 * (((nutrition || {}).totalNutrients || {}).PROCNT || {}).quantity
    ) / 10;
  const fats =
    Math.round(
      10 * (((nutrition || {}).totalNutrients || {}).FAT || {}).quantity
    ) / 10;

  return (
    <div>
      <h1>{title}</h1>
      <p>Calories: {nutrition.calories}</p>
      <h3>Macros</h3>
      <p>Carbs: {carbs} g</p>
      <p>Protiens: {proteins} g</p>
      <p>Fats: {fats} g</p>
    </div>
  );
};

export default Nutrition;
