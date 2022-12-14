const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

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

async function run() {
  //code goes here
  try {
    //code goes here
    const serviceCollection = client.db("doctorSamDb").collection("services");
    //get three services for home pages
    app.get("/services", async (req, res) => {
      const query = {};
      sort = { _id: -1 };
      // collection.find({}, limit=10).sort(sort)
      const cursor = serviceCollection.find(query).limit(3).sort(sort);
      const services = await cursor.toArray();
      res.send(services);
    });

    //get all the services for services page
    app.get("/servicesAll", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/servicesAll/:id", async (req, res) => {
      const id = req.params.id.toString();
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // create review
    app.post("/servicesAll/:id", async (req, res) => {
      const id = req.params.id.toString();
      const userReview = req.body;
      const result = await serviceCollection.updateOne(
        { _id: ObjectId(id) }, // should be important to "cast"
        {
          $push: {
            reviews: {
              $each: [userReview],
            },
          },
        }
      );
      res.send(result);
    });

    //create service

    app.post("/servicesAll", async (req, res) => {
      // const id = req.params.id.toString();
      const userService = req.body;
      const result = await serviceCollection.insertOne(userService);
      console.log(result);
      res.send(result);
    });

    //get reviews
    /*  app.get("/servicesAll", async (req, res) => {
      // const query = { reviews };
      const result = await serviceCollection.find({ title });
      console.log(result);
    }); */
  } finally {
    //code goes here
  }
}
run().catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`doctor server in running on port ${port}`);
});
