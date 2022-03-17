const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());


// KTIfVf5A3b4FRoJn
// homeMaterial
const uri = "mongodb+srv://homeMaterial:KTIfVf5A3b4FRoJn@cluster0.nasnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("homeMaterial");
        const homeMaterialOne = database.collection("homeMaterialOne");
        const homeMaterialReview = database.collection("homeMaterialReview");

        // get a api using get method 
        app.get('/user', async (req, res) => {
            const cursor = req.body;
            const findData = homeMaterialOne.find(cursor)
            const result = await findData.toArray();
            res.json(result);

        })

        // post method use here to add data 
        app.post('/user', async (req, res) => {
            const getData = req.body;
            const result = await homeMaterialOne.insertOne(getData);
            res.json(result);
        })

 //get review from data base using get method
      app.get('/review',async(req,res)=>{
        const cursor = req.body;
        const findData = homeMaterialReview.find(cursor)
        const result = await findData.toArray();
        res.json(result);
      })
        // review system post here 

        app.post('/review', async (req, res) => {
            const getReviewData = req.body;
            const result = await homeMaterialReview.insertOne(getReviewData);
            console.log(result);
            res.json(result);
        })

    }
    finally {

        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    console.log('hit the back side');
    res.json('hit the backend side i create that i feel awesome')
})
app.listen(port, () => {
    // console.log('hit the backend side ');
})