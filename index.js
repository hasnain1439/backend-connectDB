import express from "express";
import connectDB from "./connection.js";  // ✅ import function

const app = express();
app.use(express.json());
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("response");
});

app.post("/about", async (req, res) => {
  const myDB = await connectDB();
  let table = myDB.collection("products");

  let obj = {
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
  };

  let insertedData = await table.insertOne(obj);

  res.send({ message: "✅ Product inserted", id: insertedData.insertedId });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
