import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import Pantry from "./pages/Pantry";
import RecipeDetails from "./pages/RecipeDetails";

function App() {

  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/pantry"
          element={
            <Pantry
              currentItems={items}
              updateItems={setItems}
              setRecipes={setRecipes}
            />
          }
        />

        <Route
          path="/recipes"
          element={
            <Recipes
              currentItems={items}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              currentItems={items}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;