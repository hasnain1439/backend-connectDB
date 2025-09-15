import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const conectionFunction= async ()=>{
    await client.connect();
    return client.db("productsdb");

}

export default conectionFunction;
