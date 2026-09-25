export default async function handler(req, res) {

  const { type, i } = req.query;

  if (!type || !i) {
    return res.status(400).json({
      error: "Missing API parameters"
    });
  }

  const url =
    `https://www.themealdb.com/api/json/v1/1/${type}.php?i=${encodeURIComponent(i)}`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {

    return res.status(500).json({
      error: "Failed to fetch data from TheMealDB"
    });

  }
}