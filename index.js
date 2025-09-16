import express from "express";
import connectDB from "./connection.js";  // ✅ import function
import { ObjectId } from "mongodb";

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

app.delete("/delete/:id", async (req, res)=>{
  let id = req.params.id;
  const myDB = await connectDB();
  let table = myDB.collection("products");
  let deleteEntry =  await table.deleteOne({_id: new ObjectId(id)})
  let obj = {
    status: "success",
    message: `Product with id ${id} deleted`,
    deleteEntry
  }
  console.log(id);
  res.send(deleteEntry);
})
app.put('/update/:id',async (req, res)=>{
  let id = req.params.id;
  let productsName = req.body.name;
  let productsPrice = req.body.price;
  let productsBrand = req.body.brand;
  let productsCategory = req.body.category;
  let obj = {};
  if(productsName!==undefined && productsName!=="" && productsName !== null){
    obj.name = productsName;
  }
  if(productsPrice!==undefined && productsPrice!=="" && productsPrice !== null){
    obj.price = productsPrice;
  }
  if(productsBrand!==undefined && productsBrand!=="" && productsBrand !== null){
    obj.brand = productsBrand;
  }
  if(productsCategory!==undefined && productsCategory!=="" && productsCategory !== null){
    obj.category = productsCategory;
  }
  const myDB = await connectDB();
  const table = myDB.collection("products");
  let updateDate= await table.updateOne({_id: new ObjectId(id)}, {$set: obj})
  
  let resObj ={
    status: "success",
    message: `Product with id ${id} updated`,
    updateDate
  }

  res.send(resObj); 
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
