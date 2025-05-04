const express = require("express");
const app = express();
const PORT = 3000;

const itemsRoute = require("./routes/items");

app.use(express.json());
app.use("/api/items", itemsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
