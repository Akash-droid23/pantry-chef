import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Recipes(props) {

  const navigate = useNavigate();

  function findRecipes() {

    props.currentItems.map((item) => {

      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(item)}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          if (data.meals) {

            const recipeIds = data.meals.map((item) => {
              return item.idMeal;
            });

            const uniqueRecipeIds = [...new Set(recipeIds)];

            props.setRecipes((prevRecipes) => {

              const allRecipes = [...prevRecipes, ...data.meals];

              const seenId = new Set();

              const uniqueRecipes = allRecipes.filter((recipe) => {

                if (seenId.has(recipe.idMeal) === false) {
                  seenId.add(recipe.idMeal);
                  return true;
                }

                return false;
              });

              return uniqueRecipes;
            });

            uniqueRecipeIds.map((id) => {
              getRecipeDetails(id);
            });
          }
        });
    });
  }

  function getRecipeDetails(id) {

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        const recipeDetails = data.meals[0];

        let recipeIngredients = [];

        for (let i = 1; i <= 20; i++) {

          const ingredient = recipeDetails[`strIngredient${i}`];

          if (ingredient && ingredient.trim() !== "") {
            recipeIngredients.push(ingredient);
          }
        }

        const matchedIngredients = recipeIngredients.filter((item) => {

          return props.currentItems.some((pantryItem) => {

            return (
              pantryItem.trim().toLowerCase() ===
              item.trim().toLowerCase()
            );
          });
        });

        recipeDetails.matchPercentage = Math.round(
          (matchedIngredients.length / recipeIngredients.length) * 100
        );

        props.setRecipes((prevRecipes) => {

          let recipeFound = false;

          const updatedRecipes = prevRecipes.map((item) => {

            if (recipeDetails.idMeal === item.idMeal) {

              recipeFound = true;

              return {
                ...item,
                matchPercentage: recipeDetails.matchPercentage
              };
            }

            return item;
          });

          if (recipeFound === false) {

            return [
              ...updatedRecipes,
              {
                idMeal: recipeDetails.idMeal,
                strMeal: recipeDetails.strMeal,
                strMealThumb: recipeDetails.strMealThumb,
                matchPercentage: recipeDetails.matchPercentage
              }
            ];
          }

          return updatedRecipes;
        });
      });
  }

  useEffect(() => {

    if (props.recipes.length === 0) {
      findRecipes();
    }

  }, []);

  const sortedRecipes = [...props.recipes]
    .sort(function (a, b) {
      return b.matchPercentage - a.matchPercentage;
    })
    .slice(0, 42);

  return (
    <div className="recipes-page">

      <button
        className="back-button"
        onClick={() => navigate("/pantry")}
      >
        ← Back
      </button>

      <div className="recipes-content">

        <h1>Recipes 🍳</h1>

        <p className="recipes-subtitle">
          Recipes you can make with your ingredients
        </p>

        <div className="recipe-grid">

          {sortedRecipes.map((recipe) => {

            return (
              <div className="recipe-card" key={recipe.idMeal}>

                <img
                  className="recipe-image"
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />

                <div className="recipe-info">

                  <h2>{recipe.strMeal}</h2>

                  <p className="match-percentage">
                    Match:{" "}
                    {recipe.matchPercentage !== undefined
                      ? recipe.matchPercentage + "%"
                      : "Calculating..."}
                  </p>

                  <Link
                    className="view-recipe-button"
                    to={`/recipe/${recipe.idMeal}`}
                  >
                    View Recipe
                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Recipes;