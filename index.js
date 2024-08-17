const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle ware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jhmpwvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productCollection = client.db("rupaliStore").collection("products");


    app.get('/products/category', async(req, res)=>{
      const category = req.query.category
      let query = {categoryName: category}
      const result = await productCollection.find(query).toArray();
      res.send(result)
    })

    app.get('/products', async(req, res)=>{
      const result = await productCollection.find().toArray()
      res.send(result)
    })

    app.post('/products', async(req, res) => {
      const productInfo = req.body;
      const result = await productCollection.insertOne(productInfo)
      res.send(result)
    })




    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  console.log('rupali store server is running');
  res.send('rupali store server is running')

})
app.listen(port, () => {
  console.log(`rupali store server is running on port: ${port}`);
})