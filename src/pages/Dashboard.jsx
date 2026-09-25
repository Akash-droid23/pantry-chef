import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  function startCooking() {
    navigate("/pantry");
  }

  return (
    <div className="landing-page">

      <div className="landing-content">

        <div className="chef-icon">👨‍🍳</div>
        <h1>From Pantry to Plate 🍽️</h1>

        <p>
            Discover delicious recipes hiding in your kitchen.
        </p>

        <button onClick={startCooking}>
          Let's Begin Cooking 🍳
        </button>

      </div>

    </div>
  );
}

export default Dashboard;