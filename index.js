const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASSWORD);

app.get("/", (req, res) => {
  res.send("doctor sam server is running");
});

//database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kdwgcoc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const serviceCollection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(port, () => {
  console.log(`doctor server in running on port ${port}`);
});
