import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientComponent, {
  ingredientEmojis
} from "./ingredientComponent";

function Pantry(props) {

  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleIngredient(event) {
    setIngredient(event.target.value);
    setError("");
  }

  function addIngredient(event) {

    event.preventDefault();

    const enteredIngredient = ingredient.trim().toLowerCase();

    if (enteredIngredient === "") {
      return;
    }

    if (!ingredientEmojis[enteredIngredient]) {
      setError("Please enter a valid ingredient.");
      return;
    }

    props.updateItems((prevItems) => {
      return [...prevItems, ingredient.trim()];
    });

    setIngredient("");
    setError("");
  }

  function deleteIngredient(id) {

    props.updateItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function cook() {

    // Clear recipes from the previous search
    props.setRecipes([]);

    navigate("/recipes");
  }

  return (
    <div className="pantry-page">

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="pantry-content">

        <h1>My Pantry 🥕</h1>

        <p>Add the ingredients you have at home.</p>

        <form
          onSubmit={addIngredient}
          className="ingredient-form"
        >

          <input
            type="text"
            placeholder="Enter an ingredient..."
            value={ingredient}
            onChange={handleIngredient}
          />

          <button type="submit">
            Add Ingredient
          </button>

        </form>

        {error && (
          <p className="ingredient-error">
            ⚠️ {error}
          </p>
        )}

        <div className="ingredient-list">

          {props.currentItems.map((item, index) => (
            <IngredientComponent
              key={index}
              id={index}
              onDelete={deleteIngredient}
              ingredientItem={item}
            />
          ))}

        </div>

        {props.currentItems.length > 0 && (
          <button
            className="cook-button"
            onClick={cook}
          >
            Cook 🍳
          </button>
        )}

      </div>

    </div>
  );
}

export default Pantry;