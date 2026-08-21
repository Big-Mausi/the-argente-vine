import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The Argenté Vine API is running on port ${PORT}`);
});
