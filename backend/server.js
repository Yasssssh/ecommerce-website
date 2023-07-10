import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/products", (req, res) => {
  res.json(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
