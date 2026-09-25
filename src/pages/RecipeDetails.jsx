import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetails(props) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipe(data.meals[0]);
      });
  }, [id]);

  if (recipe === null) {
  return (
    <div className="loading-page">
      <h2>👨‍🍳 Cooking your recipe...</h2>
      <p>This may take a few seconds.</p>
    </div>
  );
}

  const missingIngredients = [];

  for (let i = 1; i <= 20; i++) {

    const ingredient = recipe[`strIngredient${i}`];

    if (
      ingredient &&
      ingredient.trim() !== "" &&
      !props.currentItems.some((item) => {
        return (
          item.trim().toLowerCase() ===
          ingredient.trim().toLowerCase()
        );
      })
    ) {
      missingIngredients.push(ingredient);
    }
  }

  return (
    <div className="details-page">

      <button
        className="back-button"
        onClick={() => navigate("/recipes")}
      >
        ← Back
      </button>

      <div className="details-container">

        <img
          className="details-image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div className="details-content">

          <h1>{recipe.strMeal}</h1>

          <p className="recipe-category">
            {recipe.strCategory} • {recipe.strArea}
          </p>

          <div className="details-section">

            <h2>Ingredients 🥕</h2>

            <ul className="ingredients-list">

              {Array.from({ length: 20 }, (_, index) => {

                const ingredient =
                  recipe[`strIngredient${index + 1}`];

                const measure =
                  recipe[`strMeasure${index + 1}`];

                if (!ingredient || ingredient.trim() === "") {
                  return null;
                }

                return (
                  <li key={index}>
                    <span>{ingredient}</span>
                    <span>{measure}</span>
                  </li>
                );

              })}

            </ul>

          </div>

          <div className="details-section">

            <h2>Missing Ingredients ⚠️</h2>

            {missingIngredients.length === 0 ? (

              <p className="no-missing">
                You have all the ingredients! 🎉
              </p>

            ) : (

              <ul className="missing-list">

                {missingIngredients.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      {ingredient}
                    </li>
                  );
                })}

              </ul>

            )}

          </div>

          <div className="details-section">

            <h2>Instructions 👨‍🍳</h2>

            <p className="instructions">
              {recipe.strInstructions}
            </p>

          </div>

          <div className="details-section">

            <h2>Watch Recipe Videos 🎥</h2>

            <a
              className="youtube-button"
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                recipe.strMeal + " recipe"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search "{recipe.strMeal}" on YouTube ▶️
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecipeDetails;
