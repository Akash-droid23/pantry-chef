# PantryChef 🥘

PantryChef is a recipe finder built with React. You enter the ingredients you have at home, and the app finds recipes that can be made using those ingredients.

## Live Demo

[https://pantry-chef-zeta.vercel.app](https://pantry-chef-zeta.vercel.app)

## Features

- Add and remove pantry ingredients
- Find recipes based on available ingredients
- Calculate ingredient match percentage
- Sort recipes by match percentage
- View complete recipe details
- See which ingredients are missing
- Search for recipe videos on YouTube

## Tech Used

- React
- JavaScript
- React Router
- Vite
- CSS
- TheMealDB API
- Vercel

## How It Works

1. Add the ingredients you have.
2. Click **Cook**.
3. PantryChef searches TheMealDB for recipes.
4. The app checks the recipe ingredients against the ingredients in the pantry.
5. Each recipe gets a match percentage.
6. Recipes are displayed based on the match percentage.
7. Click **View Recipe** to see the full recipe and missing ingredients.

## API

PantryChef uses the [TheMealDB API](https://www.themealdb.com/) to get recipe information.

For deployment, I added a Vercel serverless function to handle API requests.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Akash-droid23/pantry-chef.git
```

### 2. Navigate to the project directory

```bash
cd pantry-chef
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```